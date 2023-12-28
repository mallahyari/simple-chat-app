from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from app.api.routers.llm_service import llm_router
import typing as t
import uvicorn


app = FastAPI(
    title="LiteLLM backend API", docs_url="/docs"
)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(request: Request):
    return {"message": "Server is up and running!"}


app.include_router(llm_router, prefix="/api/v1", tags=["LiteLLM"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8010)