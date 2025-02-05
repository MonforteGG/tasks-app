from fastapi import APIRouter, HTTPException, Depends, Request
from user_db import create_user, login
from models import User, Login

auth = APIRouter()


@auth.post('/register')
async def register(request:User):
    new_user = await create_user(request)
    return new_user


@auth.post('/login')
async def log(request: Request, login_data: Login):
    token = await login(request, login_data)
    return {"token": token}
