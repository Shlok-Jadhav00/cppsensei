import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Search, 
  Bug,
  Zap
} from "lucide-react";

interface AIChatboxProps {
  className?: string;
}

const AIChatbox = ({ className }: AIChatboxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: number;
    type: 'ai' | 'user';
    content: string;
    timestamp: Date;
  }>>([
    {
      id: 1,
      type: "ai",
      content: "Hi! I'm your AI coding assistant. Ask me anything about your code!",
      timestamp: new Date(),
    }
  ]);

  const quickActions = [
    { 
      id: "explain", 
      label: "Explain step by step", 
      icon: <Sparkles className="h-4 w-4" />,
      color: "primary"
    },
    { 
      id: "optimize", 
      label: "Optimize my code", 
      icon: <Zap className="h-4 w-4" />,
      color: "secondary" 
    },
    { 
      id: "debug", 
      label: "Find errors", 
      icon: <Bug className="h-4 w-4" />,
      color: "accent" 
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: message,
      timestamp: new Date(),
    };

    const aiResponse = {
      id: messages.length + 2,
      type: "ai" as const,
      content: `I understand you're asking about: "${message}". Let me help you with that! This is a demo response - in a real implementation, this would connect to an AI API to provide detailed explanations about your code.`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage, aiResponse]);
    setMessage("");
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      explain: "Can you explain my code step by step?",
      optimize: "How can I optimize this code for better performance?",
      debug: "Are there any errors or bugs in my code?",
    };

    setMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className={`transition-all duration-300 ${isExpanded ? 'w-96 h-96' : 'w-80 h-16'} shadow-lg border-2 border-primary/20`}>
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer bg-gradient-primary rounded-t-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
            <span className="font-ui font-semibold text-primary-foreground">AI Assistant</span>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-primary-foreground" />
          ) : (
            <ChevronUp className="h-5 w-5 text-primary-foreground" />
          )}
        </div>

        {/* Content - Only visible when expanded */}
        {isExpanded && (
          <CardContent className="flex flex-col h-80 p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl font-ui text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t bg-muted/30">
              <div className="flex gap-2 mb-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAction(action.id)}
                    className="flex-1 gap-1 font-ui text-xs h-8"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your code..."
                  className="font-ui text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIChatbox;