import { useState, useEffect, useRef } from "react";
import { 
  Sun, Moon, Play, Lightbulb, BookOpen, Copy, Download, 
  GraduationCap, Brain, Code, Bot, ChevronUp, ChevronDown,
  ChevronRight, List, Zap, AlertCircle, Send, User, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [explanationMode, setExplanationMode] = useState<'idle' | 'line' | 'full'>('idle');
  const [code, setCode] = useState(defaultCode);
  const [isChatboxExpanded, setIsChatboxExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ message: string; sender: 'ai' | 'user' }>>([
    { message: "Hi! I'm your AI coding assistant. I can help explain your C++ code, find bugs, suggest improvements, and answer programming questions. What would you like to know?", sender: 'ai' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState('home');
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

  const lineExplanations = [
    { line: 1, code: "// Welcome to CodeLearn!", explanation: isBeginnerMode 
      ? "This is a comment - it's just a note for humans to read. The computer ignores anything after '//' on a line."
      : "Single-line comment using C++'s // syntax. Comments are ignored by the compiler." },
    { line: 4, code: "#include <iostream>", explanation: isBeginnerMode
      ? "This tells the computer to include a special toolbox called 'iostream' that lets us use input/output commands like 'cin' (input) and 'cout' (output). Think of it like importing a calculator app on your phone."
      : "Preprocessor directive that includes the iostream header file, providing access to standard input/output stream objects like cin and cout." },
    { line: 5, code: "using namespace std;", explanation: isBeginnerMode
      ? "This is a shortcut that saves us from typing 'std::' before commands like cout. Instead of writing 'std::cout', we can just write 'cout'. It's like setting a nickname for a long name."
      : "Using directive that brings the standard namespace into the current scope, eliminating the need to prefix standard library functions with 'std::'." },
    { line: 7, code: "int fibonacci(int n) {", explanation: isBeginnerMode
      ? "This creates a function (like a mini-program) called 'fibonacci'. It takes one whole number 'n' as input and will return a whole number back. The '{' starts the function's instructions."
      : "Function declaration defining fibonacci with integer parameter n and integer return type. Opening brace begins function body." },
    { line: 9, code: "if (n <= 1) {", explanation: isBeginnerMode
      ? "This checks: 'Is n less than or equal to 1?' If yes (true), it will do what's inside the next set of brackets. This handles the simple cases: F(0)=0 and F(1)=1."
      : "Conditional statement checking base cases for the recursive function when n ≤ 1." },
    { line: 16, code: "int main() {", explanation: isBeginnerMode
      ? "Every C++ program needs a 'main' function - this is where the program starts running, like the front door of a house. The computer always looks for 'main' first."
      : "Main function declaration - the entry point of every C++ program. Execution begins here." }
  ];

  const fullExplanations = [
    { id: "overview", title: "What This Program Does", icon: Sparkles, content: isBeginnerMode
      ? "This C++ program calculates and prints the first 10 Fibonacci numbers. The Fibonacci sequence is famous in math and nature - each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... You can see this pattern in sunflower seeds, pinecones, and even galaxies!"
      : "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n). Demonstrates basic C++ syntax, recursion, and I/O operations." },
    { id: "structure", title: "Program Structure", icon: Code, content: isBeginnerMode
      ? "Every C++ program has the same basic parts: 1) Include statements (like importing tools), 2) The 'main' function (where the program starts), and 3) Other functions we create. This program also has a 'fibonacci' function that we created to do the math calculations."
      : "Standard C++ program structure with preprocessor directives, namespace usage, function declarations, and the main entry point. Follows typical C++ organizational patterns." },
    { id: "algorithm", title: "How the Fibonacci Function Works", icon: Brain, content: isBeginnerMode
      ? "The fibonacci function is 'recursive' - it calls itself! Think of it like Russian nesting dolls. To find F(5), it needs F(4) and F(3). To find F(4), it needs F(3) and F(2), and so on, until it reaches F(0)=0 and F(1)=1. Then it builds the answer back up: F(2)=1, F(3)=2, F(4)=3, F(5)=5."
      : "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm with exponential time complexity." },
    { id: "improvements", title: "Making It Better", icon: Lightbulb, content: isBeginnerMode
      ? "This code is great for learning, but it's slow for big numbers because it recalculates the same values many times. Imagine asking 'What's 2+2?' a thousand times instead of remembering the answer! We could make it faster by storing previous answers or using a different approach."
      : "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient. Could also add input validation and error handling for production code." }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-extrabold text-xl text-primary">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-sm">
              🥋
            </div>
            <span>Cpp Sensei</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'learn', 'features', 'pricing', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === section 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Home Section - Code Editor */}
      <section id="home" className="h-[calc(100vh-4rem)]">
        <main className="flex h-full gap-4 p-4">
          {/* Code Editor Panel */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-card rounded-xl border border-border shadow-sm">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30 rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md font-medium text-sm">
                    <span>⚡</span>
                    <span>C++</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleRunCode}>
                      <Play className="w-4 h-4" /> Run
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleLineExplain}>
                      <Lightbulb className="w-4 h-4" /> Line-by-Line
                    </Button>
                    <Button size="sm" variant="accent" onClick={handleFullExplain}>
                      <BookOpen className="w-4 h-4" /> Full Explain
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={handleCopyCode}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleDownloadCode}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Code Editor Content */}
              <div className="flex flex-1 bg-code-bg rounded-b-xl overflow-hidden">
                <div 
                  ref={lineNumbersRef}
                  className="w-12 bg-black/10 border-r border-white/10 py-4 px-2 font-code text-xs text-code-comment select-none overflow-hidden"
                >
                  {getLineNumbers().map(num => (
                    <div key={num} className="text-right leading-6">{num}</div>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={syncScroll}
                  className="flex-1 p-4 bg-transparent text-code-foreground font-code text-sm leading-6 resize-none outline-none"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="w-96 min-w-96">
            <div className="flex flex-col h-full bg-card rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg">
                    {explanationMode === 'idle' && 'AI Explanations'}
                    {explanationMode === 'line' && 'Line-by-Line Explanation'}
                    {explanationMode === 'full' && 'Full Code Explanation'}
                  </h2>
                  {explanationMode !== 'idle' && (
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium">
                      {explanationMode === 'line' ? 'Interactive' : 'Comprehensive'}
                    </span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant={isBeginnerMode ? "accent" : "secondary"}
                  onClick={() => {
                    setIsBeginnerMode(!isBeginnerMode);
                    toast(`Switched to ${!isBeginnerMode ? 'beginner' : 'advanced'} mode`);
                  }}
                >
                  {isBeginnerMode ? <GraduationCap className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                  <span>{isBeginnerMode ? 'Beginner Mode' : 'Advanced Mode'}</span>
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {explanationMode === 'idle' && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Ready to Learn!</h3>
                      <p className="text-muted-foreground text-sm">
                        Click "Line-by-Line" or "Full Explain" to get AI-powered explanations of your code.
                      </p>
                    </div>
                  </div>
                )}

                {explanationMode === 'line' && (
                  <div className="space-y-4">
                    {lineExplanations.map((item) => (
                      <div key={item.line} className="p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-medium">
                            Line {item.line}
                          </span>
                          <code className="text-xs font-code text-muted-foreground">{item.code}</code>
                        </div>
                        <p className="text-sm">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {explanationMode === 'full' && (
                  <div className="space-y-2">
                    {fullExplanations.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(item.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5 text-primary" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          {expandedSections.has(item.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        {expandedSections.has(item.id) && (
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            {item.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Learn Section */}
      <section id="learn" className="min-h-screen py-16 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Learn with Cpp Sensei
            </h1>
            <p className="text-xl text-muted-foreground">Interactive tutorials designed for absolute beginners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "📚", title: "Learn C++ from Scratch", desc: "Start your coding journey with zero prior knowledge required" },
              { icon: "🔍", title: "Line by Line Explanations", desc: "Understand every single line of code in simple English" },
              { icon: "💬", title: "Input & Output with cin/cout", desc: "Master how to get input and display output in C++" },
              { icon: "🔄", title: "Variables & Loops", desc: "Learn how to store data and repeat actions efficiently" }
            ].map((item, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Button>Start Learning</Button>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { num: 1, icon: "⌨️", title: "Type Your Code", desc: "Write or paste your C++ code in the editor" },
                { num: 2, icon: "🔍", title: 'Click "Explain"', desc: "Let the AI analyze your code" },
                { num: 3, icon: "📖", title: "Read Explanations", desc: "Get beginner-friendly breakdowns" },
                { num: 4, icon: "💬", title: "Chat with Sensei", desc: "Ask questions anytime" }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2 mx-auto">
                      {step.num}
                    </div>
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-xs text-muted-foreground max-w-32">{step.desc}</p>
                  </div>
                  {i < 3 && <span className="text-2xl text-muted-foreground hidden lg:block">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Features that Make Learning Fun
            </h1>
            <p className="text-xl text-muted-foreground">Everything you need to master C++ coding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "AI Line-by-Line Explanation", desc: "Understand every single line of your code in simple English, perfect for beginners" },
              { icon: "💬", title: "Smart Chat Assistant", desc: "Ask your doubts to Cpp Sensei anytime and get instant, helpful answers" },
              { icon: "🎨", title: "Playful Design", desc: "Learn C++ in a fun, colorful environment that makes coding enjoyable" },
              { icon: "📖", title: "Full Code Summary", desc: "See what your whole program does at once with comprehensive overviews" },
              { icon: "⚡", title: "No Setup Needed", desc: "Just type and learn instantly in your browser - no downloads required" },
              { icon: "🎯", title: "Beginner Focused", desc: "Every explanation assumes zero prior knowledge - we start from the basics" }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen py-16 bg-muted/30">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Plans & Access
            </h1>
            <p className="text-xl text-muted-foreground">Simple, honest pricing for learners</p>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border shadow-sm text-center">
            <div className="text-6xl mb-4">🥋</div>
            <h2 className="text-3xl font-bold mb-4">Free Forever</h2>
            <p className="text-muted-foreground mb-6">
              Cpp Sensei is completely free to use! We're building more features to make your learning journey even better.
            </p>
            <div className="space-y-3 mb-8">
              {["Unlimited code explanations", "AI chat assistant", "All tutorials included", "No credit card required"].map((feature, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => scrollToSection('home')}>Start Coding Free</Button>
            <p className="text-sm text-muted-foreground mt-4">More features coming soon! 🚀</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              About Cpp Sensei
            </h1>
            <p className="text-xl text-muted-foreground">Your friendly AI-powered C++ mentor</p>
          </div>

          <div className="space-y-12">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                Cpp Sensei was built to make learning C++ simple, visual, and fun.
                Every line you write tells a story — and we help you understand it.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">Why We Built This</h2>
              <p className="text-muted-foreground">
                We noticed that many students struggle to understand code because traditional tutorials
                just show the code without explaining <em>why</em> each line exists and what it does.
                That's why we created Cpp Sensei - a platform that explains every single line in plain,
                beginner-friendly language. No jargon, no assumptions, just clear explanations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4 text-center">Built With</h2>
              <div className="flex justify-center gap-8">
                {[
                  { icon: "HTML5", name: "HTML" },
                  { icon: "CSS3", name: "CSS" },
                  { icon: "JS", name: "JavaScript" },
                  { icon: "🤖", name: "AI Powered" }
                ].map((tech, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                      {tech.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbox */}
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
    </div>
  );
};

export default Index;
