// app/components/AIChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { MessageSquare, Send, User, Bot, X, Maximize2, Minimize2 } from "lucide-react";
import { Badge } from "./ui/Badge";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm the BridalEcon Assistant. Ask me anything about global marriage customs, bride prices, or cultural traditions." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      if (!response.ok) throw new Error("Failed to send");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[hsl(var(--brand-500))] text-white shadow-glow flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-16 bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))] px-3 py-1.5 rounded-lg text-xs font-medium border border-[hsl(var(--border))] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with AI
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'h-16 w-64' : 'h-[500px] w-80 sm:w-96'}`}>
      <Card className="h-full flex flex-col shadow-2xl overflow-hidden border-[hsl(var(--brand-500)/0.2)]">
        <CardHeader className="p-4 bg-[hsl(var(--surface-elevated))] border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--brand-500))] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">BridalEcon AI</CardTitle>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-[hsl(var(--text-muted))] font-medium uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)} 
              className="p-1.5 hover:bg-[hsl(var(--surface-overlay))] rounded-md transition-colors text-[hsl(var(--text-muted))]"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 hover:bg-[hsl(var(--surface-overlay))] rounded-md transition-colors text-[hsl(var(--text-muted))]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[hsl(var(--surface))]" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[hsl(var(--brand-500))] text-white rounded-tr-none' 
                      : 'bg-[hsl(var(--surface-overlay))] text-[hsl(var(--text-primary))] border border-[hsl(var(--border))] rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--text-muted))] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--text-muted))] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--text-muted))] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </CardContent>

            <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)]"
                />
                <Button size="sm" onClick={handleSend} disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
