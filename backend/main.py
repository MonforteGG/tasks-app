from fastapi import FastAPI
from routes.task import task
from routes.user import auth
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get('/')
def welcome():
    return {'message': 'Welcome to the my FastAPI API'}


app.include_router(task)
app.include_router(auth)
