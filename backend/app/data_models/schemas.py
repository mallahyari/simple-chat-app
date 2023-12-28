from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    role: str
    content: str

class ChatConversation(BaseModel):
    messages: List[Message]
    


