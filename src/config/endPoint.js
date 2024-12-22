const BASE_URL = import.meta.env.VITE_BASE_URL
const CHAT_URL = import.meta.env.VITE_CHAT_URL

const endPonts = {
    getDeails: "informer/v1/chat",
    getChatResponse: "agent/v1/chat"
}


export {
    BASE_URL,
    CHAT_URL,
    endPonts
}