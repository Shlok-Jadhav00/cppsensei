import { Bot, ChevronUp, ChevronDown, List, Zap, AlertCircle, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";

const AIChatbox = () => {
  const {
    isChatboxExpanded,
    setIsChatboxExpanded,
    chatMessages,
    chatMessagesRef,
    chatInput,
    setChatInput,
    sendMessage,
    handleQuickAction,
  } = useAppContext();

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-card rounded-xl border border-border shadow-lg transition-all ${isChatboxExpanded ? 'h-[500px]' : 'h-14'}`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsChatboxExpanded(!isChatboxExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-sm">AI Assistant</span>
            <span className="text-xs text-muted-foreground block">Ready to help</span>
          </div>
        </div>
        <button>
          {isChatboxExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {isChatboxExpanded && (
        <div className="flex flex-col h-[calc(100%-3.5rem)]">
          <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'ai' ? 'bg-primary/10' : 'bg-secondary'}`}>
                  {msg.sender === 'ai' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-border">
            <div className="flex gap-2 mb-2">
              {[
                { action: 'step-by-step', icon: List, label: 'Explain step by step' },
                { action: 'optimize', icon: Zap, label: 'Optimize' },
                { action: 'find-errors', icon: AlertCircle, label: 'Find errors' }
              ].map((btn) => (
                <button
                  key={btn.action}
                  onClick={() => handleQuickAction(btn.action)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
                >
                  <btn.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything about your code..."
                className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm outline-none"
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbox;
