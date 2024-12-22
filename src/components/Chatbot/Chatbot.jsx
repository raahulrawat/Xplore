import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import botIcon from "../../assets/ChatBot.svg"
import { CHAT_URL, endPonts } from "../../config/endPoint";
import { POST_REQUEST } from "../../common/HttpRequest";

const Chatbot = (props) => {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [botMessageIndex, setBotMessageIndex] = useState(0);
    const [currentBotMessage, setCurrentBotMessage] = useState('');

    const chatResponse = (userMessage) => {
        let apiUrl = CHAT_URL + endPonts.getChatResponse;
        const requestData = {
            prompt: userMessage,
            context: props
        };
        return POST_REQUEST(apiUrl, requestData);
    };

    const handleSendMessage = async () => {
        if (inputText.trim() !== "") {
            const userMessage = inputText.trim();
            setMessages([...messages, { text: userMessage, sender: "user" }]);
            setInputText("");
            try {
                const response = await chatResponse(userMessage);
                const botResponse = response.data.response;
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: botResponse, sender: "bot" }
                    ]);
                }, 1000);
            } catch (err) {
                console.log("Error fetching chat response:", err);
            }
        }
    };

    useEffect(() => {
        if (botMessageIndex < messages.length) {
            const botMessage = messages[botMessageIndex];
            if (botMessage.sender === 'bot') {
                const messageText = botMessage.text;
                let charIndex = 0;
                const interval = setInterval(() => {
                    if (charIndex <= messageText.length) {
                        setCurrentBotMessage(messageText.substring(0, charIndex));
                        charIndex++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            setBotMessageIndex(prevIndex => prevIndex + 1);
                        }, 1000);
                    }
                }, 50);

                return () => clearInterval(interval);
            } else {
                setBotMessageIndex(prevIndex => prevIndex + 1);
            }
        }
    }, [botMessageIndex, messages]);

    const handleClick = () => {
        setShowModal(!showModal);
    };

    const divVariants = {
        initial: { y: 0 },
        animate: {
            y: [-20, 0, -30],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                loop: Infinity,
            },
        },
    };

    return (
        <div>
            <motion.div
                animate={showModal ? "initial" : "animate"}
                variants={divVariants}
                onClick={handleClick}
                whileHover={{ scale: 1.2 }} // Scale up on hover
                className="fixed bottom-0 right-0 z-10 cursor-pointer"
                style={{ right: "30px", bottom: "18px" }}
            >
                <img style={{ height: "80px", width: "80px" }} src={botIcon} alt="Bot Icon" />
            </motion.div>
            {showModal && <motion.div className="flex flex-col bg-gray-100 rounded-t-3xl  rounded-b-3xl" style={{ bottom: "90px", right: "30px", height: "500px", width: "360px", position: "fixed", zIndex: 100 }}>
                <motion.div className="flex items-center justify-center text-white font-bold text-lg rounded-t-3xl" style={{ background: "rgb(48, 97, 82)", height: "50px" }}>
                    Chatbot
                </motion.div>
                <motion.div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`my-2 p-2 rounded-lg ${message.sender === "bot"
                                ? "bg-white text-gray-800 self-start border border-gray-200"
                                : "text-white self-end"
                                }`}
                            style={{ background: `${message.sender === "bot" ? "bg-white" : " rgb(48, 97, 82)"}`, fontSize: "14px", whiteSpace: "pre-line" }}
                        >
                            {message.sender === 'bot' && index === botMessageIndex ? (
                                <span style={{ whiteSpace: 'pre-line' }}>{currentBotMessage}</span>
                            ) : (
                                <span>{message.text}</span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="flex items-center p-4 bg-white  rounded-b-3xl">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        style={{ fontSize: "14px" }}
                        className="flex-grow px-4 py-2 mr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <motion.button
                        onClick={handleSendMessage}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        style={{ background: "rgb(48, 97, 82)" }}
                        className="text-white px-6 py-2 rounded-full font-semibold focus:outline-none hover:bg-green-700"
                    >
                        Send
                    </motion.button>
                </motion.div>
            </motion.div>}
        </div>
    );
};

export default Chatbot;
