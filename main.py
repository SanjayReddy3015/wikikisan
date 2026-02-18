from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from ai_engine import answer_question
from storage import ConversationStore
from news_engine import get_suggested_questions

app = FastAPI(title="WikiKisan AI API")

store = ConversationStore()

# -------------------------------
# MODELS
# -------------------------------
class StartResponse(BaseModel):
    sessionId: str
    welcomeMessage: str
    suggestedQuestions: List[str]

class MessageRequest(BaseModel):
    sessionId: str
    message: str
    language: str

class MessageResponse(BaseModel):
    response: str
    intent: str
    confidence: float
    suggestedQuestions: List[str]

# -------------------------------
# START CONVERSATION
# -------------------------------
@app.post("/start", response_model=StartResponse)
def start_conversation(language: str = "en"):
    session_id = str(uuid4())
    store.create(session_id)

    return {
        "sessionId": session_id,
        "welcomeMessage": "Hello! I'm your AI farming assistant. How can I help you?",
        "suggestedQuestions": get_suggested_questions()
    }

# -------------------------------
# SEND MESSAGE
# -------------------------------
@app.post("/message", response_model=MessageResponse)
def send_message(req: MessageRequest):
    answer, confidence = answer_question(req.message)

    store.add_message(req.sessionId, req.message, answer)

    return {
        "response": answer,
        "intent": "farming_advice",
        "confidence": confidence,
        "suggestedQuestions": get_suggested_questions()
    }

# -------------------------------
# CHAT HISTORY
# -------------------------------
@app.get("/history/{session_id}")
def get_history(session_id: str):
    return store.get(session_id)

# -------------------------------
# DELETE CONVERSATION
# -------------------------------
@app.delete("/delete/{session_id}")
def delete_conversation(session_id: str):
    store.delete(session_id)
    return {"status": "deleted"}
