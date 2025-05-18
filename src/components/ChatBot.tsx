
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const predefinedPrompts = [
  "How do I create a new client?",
  "What reports are available?",
  "How do I schedule a meeting?",
  "Help with project management"
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "How can I help you today?" },
    { sender: "system", text: "Send a message to get started." }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "user", text: message }]);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: "Thanks for your message. Our team will assist you shortly." 
        }]);
      }, 1000);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setMessages([...messages, { sender: "user", text: prompt }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "I'm looking into that for you..." 
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bottom-[80px] right-6 top-auto translate-y-0 translate-x-0 sm:max-w-[400px] data-[state=open]:slide-in-from-bottom-0">
          <div className="flex h-[500px] flex-col">
            <div className="border-b py-3 flex items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3 ml-2">
                CL
              </div>
              <span className="font-medium">Chat with ConsultLink</span>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.sender === "bot"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : msg.sender === "user"
                        ? "bg-muted"
                        : "bg-slate-100 text-slate-600 italic text-sm"
                    } ${msg.sender !== "system" ? "max-w-[80%] rounded-lg p-3" : "max-w-[80%] rounded-lg p-2"}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3 px-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {predefinedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full text-slate-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 focus:ring-primary"
                />
                <Button size="sm" onClick={handleSend}>Send</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
