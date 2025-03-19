from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pymongo
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Change "*" to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Debug: Check if MONGO_URI is loaded
if not MONGO_URI:
    raise ValueError("❌ MONGO_URI is missing! Check your .env file.")

# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True)
db = client["codebar"]
workshops_collection = db["workshops"]

# Models
class Student(BaseModel):
    full_name: str
    reason: str

class Instructor(BaseModel):
    full_name: str
    bio: str
    skills: List[str] = []

class Workshop(BaseModel):
    date: str
    subject: str
    students: List[Student] = []
    instructors: List[Instructor] = []

# API Endpoints
@app.post("/workshops/")
async def create_workshop(workshop: Workshop):
    workshops_collection.insert_one(workshop.dict())
    return {"message": "Workshop created successfully!"}

@app.get("/workshops/")
async def get_workshops():
    return list(workshops_collection.find({}, {"_id": 0}))

# ✅ Debugging: Print Loaded MongoDB Connection
print(f"✅ Connected to MongoDB: {MONGO_URI}")
