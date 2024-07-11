import pydantic
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId
from pydantic_core import core_schema


# TASK MODELS

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field=None):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return str(v)

    @classmethod
    def __get_pydantic_core_schema__(
            cls, _source_type, _handler
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

class Task(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    title: str
    description: Optional[str] = None
    completed: bool = False
    user_id: Optional[str] = None


    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}


class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = False

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}


# USERS MODELS

class User(BaseModel):
    id: str
    username: str
    email: EmailStr
    password: str

    class Config:
        from_attributes = True
class Login(BaseModel):
    username: str
    password: str
class Token(BaseModel):
    access_token: str
    token_type: str
class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[str] = None

    class Config:
        orm_mode = True