from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.data_models.schemas import ChatConversation, Message
from typing import List
from litellm import completion



llm_router = r = APIRouter()


@r.post("/ask")
async def generate_answer(user_chat: ChatConversation):
    messages = build_messages(user_chat.messages)
    for m in messages:
        print(m)
    

    response = completion(
        model="ollama/vicuna", 
        messages=messages, 
        stream=True
    )
    
    def gen_token():
        for chunk in response:
            yield  chunk['choices'][0]['delta'].content
            
            
    return StreamingResponse(gen_token(), media_type="text/event-stream")
    

def build_messages(original_messages: List[Message]):
    messages = []
    system_content = "You are a helpful assistant.Chat with the user in a friendly way."
    messages.append({"role": "system", "content": system_content})
    
    for message in original_messages[:-1]:
        role = message.role
        content = message.content
        messages.append({"role": role, "content": content})
        
    messages.append({"role":"User", "content": original_messages[-1].content})   
    return messages

    