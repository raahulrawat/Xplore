import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import {Input} from '../components/ui/input'

function AIAgent() {
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hi there! I’m Ghoom AI – your personal travel planner. Where do you want to go next?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Awesome! Let me gather some great options for "${input}"... 🧳`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fef9f3] via-[#f3efff] to-[#e5faff] px-4 py-6 flex flex-col">
      <header className="mb-6 text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🧭 Ghoom AI Travel Assistant
        </motion.h1>
        <p className="text-sm text-gray-500">Talk to your travel agent like a friend ✈️</p>
      </header>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto bg-white/30 backdrop-blur-md rounded-xl shadow-inner p-4 space-y-4 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-3 rounded-2xl shadow ${
              msg.sender === 'agent'
                ? 'bg-white text-gray-900 self-start'
                : 'bg-black text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-3 mt-4 sticky bottom-0 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-md"
      >
        <Input
          type="text"
          placeholder="Ask about your next adventure..."
          className="flex-1 rounded-full bg-white/80 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          className="rounded-full bg-black text-white hover:bg-white hover:text-black hover:border-black transition"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}

export default AIAgent;
