from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Change "*" to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")

client = pymongo.MongoClient(MONGO_URI)
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

# ✅ Correct Instantiations
workshop = Workshop(date="12/03/2014", subject="Shutl")

jane = Student(full_name="Jane Doe", reason="I am trying to learn programming and need some help")
lena = Student(full_name="Lena Smith", reason="I am really excited about learning to program!")

vicky = Instructor(
    full_name="Vicky Python",
    bio="I want to help people learn coding.",
    skills=["HTML", "JavaScript"]
)

nicole = Instructor(
    full_name="Nicole McMillan",
    bio="I have been programming for 5 years in Python and want to spread the love",
    skills=["Python"]
)

# ✅ Add participants correctly
workshop.students.extend([jane, lena])
workshop.instructors.extend([vicky, nicole])

print(workshop)
