import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { toast } from "sonner";

const defaultCode = `// Welcome to Cpp Sensei! 
// Let's start with a simple C++ example

#include <iostream>
using namespace std;

int fibonacci(int n) {
    // Calculate the nth Fibonacci number
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}

int main() {
    // Test the function
    for (int i = 0; i < 10; i++) {
        cout << "F(" << i << ") = " << fibonacci(i) << endl;
    }
    return 0;
}

// Try running this code or get explanations!`;

interface ChatMessage {
  message: string;
  sender: 'ai' | 'user';
}

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isBeginnerMode: boolean;
  setIsBeginnerMode: (value: boolean) => void;
  explanationMode: 'idle' | 'line' | 'full';
  setExplanationMode: (mode: 'idle' | 'line' | 'full') => void;
  code: string;
  setCode: (code: string) => void;
  isChatboxExpanded: boolean;
  setIsChatboxExpanded: (value: boolean) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatInput: string;
  setChatInput: (value: string) => void;
  expandedSections: Set<string>;
  toggleSection: (id: string) => void;
  lineNumbersRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  chatMessagesRef: React.RefObject<HTMLDivElement>;
  handleRunCode: () => void;
  handleLineExplain: () => void;
  handleFullExplain: () => void;
  handleCopyCode: () => void;
  handleDownloadCode: () => void;
  syncScroll: () => void;
  getLineNumbers: () => number[];
  sendMessage: () => void;
  handleQuickAction: (action: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [explanationMode, setExplanationMode] = useState<'idle' | 'line' | 'full'>('idle');
  const [code, setCode] = useState(defaultCode);
  const [isChatboxExpanded, setIsChatboxExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { message: "Hi! I'm your AI coding assistant. I can help explain your C++ code, find bugs, suggest improvements, and answer programming questions. What would you like to know?", sender: 'ai' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    toast(isDarkMode ? 'Switched to light mode' : 'Switched to dark mode');
  };

  const handleRunCode = () => {
    toast('Code executed!', { description: 'Your code is running... (Demo mode)' });
  };

  const handleLineExplain = () => {
    setExplanationMode('line');
    toast('Line-by-line explanation activated');
  };

  const handleFullExplain = () => {
    setExplanationMode('full');
    toast('Full explanation activated');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast('Code copied to clipboard!');
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'code.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast('Code downloaded!');
  };

  const syncScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const getLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, i) => i + 1);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { message: chatInput, sender: 'user' }]);
    setChatInput("");
    
    setTimeout(() => {
      const responses = [
        "I can help explain that part of your C++ code! Which specific line would you like me to break down?",
        "That's a great question about the Fibonacci algorithm. The recursive approach you're using is elegant but has exponential time complexity.",
        "I notice your code uses recursion. Would you like me to explain how the function calls itself, or show you an iterative alternative?",
        "The iostream header you included gives you access to cout and cin for input/output operations. Would you like to know more about C++ headers?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { message: randomResponse, sender: 'ai' }]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      'step-by-step': 'Can you explain my C++ code step by step?',
      'optimize': 'How can I optimize my Fibonacci code?',
      'find-errors': 'Are there any errors in my C++ code?'
    };
    setChatInput(actions[action] || '');
    setTimeout(() => sendMessage(), 100);
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <AppContext.Provider value={{
      isDarkMode,
      toggleTheme,
      isBeginnerMode,
      setIsBeginnerMode,
      explanationMode,
      setExplanationMode,
      code,
      setCode,
      isChatboxExpanded,
      setIsChatboxExpanded,
      chatMessages,
      setChatMessages,
      chatInput,
      setChatInput,
      expandedSections,
      toggleSection,
      lineNumbersRef,
      textareaRef,
      chatMessagesRef,
      handleRunCode,
      handleLineExplain,
      handleFullExplain,
      handleCopyCode,
      handleDownloadCode,
      syncScroll,
      getLineNumbers,
      sendMessage,
      handleQuickAction,
    }}>
      {children}
    </AppContext.Provider>
  );
};
