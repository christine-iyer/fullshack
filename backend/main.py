from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pymongo

app = FastAPI()

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
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