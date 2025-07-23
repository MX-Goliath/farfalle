import os
from enum import Enum

from dotenv import load_dotenv

load_dotenv()


class ChatModel(str, Enum):
    LLAMA_3_70B = "llama-3-70b"
    GPT_4o = "deepseek/deepseek-chat-v3-0324:free"
    GPT_4o_mini = "deepseek/deepseek-chat-v3-0324:free-mini"
    COMMAND_R = "command-r"
    DEEPSEEK_CHAT_V3 = "deepseek-chat-v3"

    # Local models
    LOCAL_LLAMA_3 = "qwen3:30b"
    LOCAL_GEMMA = "gemma3:12b"
    LOCAL_MISTRAL = "mistral-small-3.1:latest"
    LOCAL_PHI3_14B = "phi3:14b"

    # Custom models
    CUSTOM = "custom"


model_mappings: dict[ChatModel, str] = {
    ChatModel.GPT_4o: "openai/deepseek/deepseek-chat-v3-0324:free",
    ChatModel.GPT_4o_mini: "deepseek/deepseek-chat-v3-0324:free-mini",
    ChatModel.LLAMA_3_70B: "groq/llama-3.1-70b-versatile",
    ChatModel.DEEPSEEK_CHAT_V3: "deepseek/deepseek-chat-v3-0324:free",
    ChatModel.LOCAL_LLAMA_3: "ollama_chat/qwen3:30b",
    ChatModel.LOCAL_GEMMA: "ollama_chat/gemma3:12b",
    ChatModel.LOCAL_MISTRAL: "ollama_chat/mistral-small-3.1:latest",
    ChatModel.LOCAL_PHI3_14B: "ollama_chat/phi3:14b",
}


def get_model_string(model: ChatModel) -> str:
    if model == ChatModel.CUSTOM:
        custom_model = os.environ.get("CUSTOM_MODEL")
        if custom_model is None:
            raise ValueError("CUSTOM_MODEL is not set")
        return custom_model

    if model in {ChatModel.GPT_4o_mini, ChatModel.GPT_4o}:
        openai_mode = os.environ.get("OPENAI_MODE", "openai")
        if openai_mode == "azure":
            # Currently deployments are named "gpt-35-turbo" and "deepseek/deepseek-chat-v3-0324:free"
            name = model_mappings[model].replace(".", "")
            return f"azure/{name}"

    return model_mappings[model]
