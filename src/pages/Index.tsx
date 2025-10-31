import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Play, Lightbulb, BookOpen, Copy, Download, GraduationCap, Brain, Code, Sparkles, ChevronRight, ChevronDown } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [explanationMode, setExplanationMode] = useState<'idle' | 'line' | 'full'>('idle');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [code, setCode] = useState(`// Welcome to Cpp Sensei! 
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

// Try running this code or get explanations!`);

  const handleRunCode = () => {
    toast({
      title: "Code executed!",
      description: "Your code is running... (This is a demo - real execution would happen on the backend)",
    });
  };

  const handleLineExplain = () => {
    setExplanationMode('line');
    toast({
      title: "Line-by-line explanation activated",
      description: "Analyzing each line of your code...",
    });
  };

  const handleFullExplain = () => {
    setExplanationMode('full');
    toast({
      title: "Full explanation activated",
      description: "Generating comprehensive code analysis...",
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'code.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const lineExplanations = [
    {
      line: 1,
      code: "// Welcome to CodeLearn!",
      explanation: isBeginnerMode 
        ? "This is a comment - it's just a note for humans to read. The computer ignores anything after '//' on a line."
        : "Single-line comment using C++'s // syntax. Comments are ignored by the compiler."
    },
    {
      line: 4,
      code: "#include <iostream>",
      explanation: isBeginnerMode
        ? "This tells the computer to include a special toolbox called 'iostream' that lets us use input/output commands like 'cin' (input) and 'cout' (output). Think of it like importing a calculator app on your phone."
        : "Preprocessor directive that includes the iostream header file, providing access to standard input/output stream objects like cin and cout."
    },
    {
      line: 5,
      code: "using namespace std;",
      explanation: isBeginnerMode
        ? "This is a shortcut that saves us from typing 'std::' before commands like cout. Instead of writing 'std::cout', we can just write 'cout'. It's like setting a nickname for a long name."
        : "Using directive that brings the standard namespace into the current scope, eliminating the need to prefix standard library functions with 'std::'."
    },
    {
      line: 7,
      code: "int fibonacci(int n) {",
      explanation: isBeginnerMode
        ? "This creates a function (like a mini-program) called 'fibonacci'. It takes one whole number 'n' as input and will return a whole number back. The '{' starts the function's instructions."
        : "Function declaration defining fibonacci with integer parameter n and integer return type. Opening brace begins function body."
    },
    {
      line: 9,
      code: "if (n <= 1) {",
      explanation: isBeginnerMode
        ? "This checks: 'Is n less than or equal to 1?' If yes (true), it will do what's inside the next set of brackets. This handles the simple cases: F(0)=0 and F(1)=1."
        : "Conditional statement checking base cases for the recursive function when n ≤ 1."
    },
    {
      line: 16,
      code: "int main() {",
      explanation: isBeginnerMode
        ? "Every C++ program needs a 'main' function - this is where the program starts running, like the front door of a house. The computer always looks for 'main' first."
        : "Main function declaration - the entry point of every C++ program. Execution begins here."
    }
  ];

  const fullExplanations = [
    {
      id: "overview",
      title: "What This Program Does",
      icon: Sparkles,
      content: isBeginnerMode
        ? "This C++ program calculates and prints the first 10 Fibonacci numbers. The Fibonacci sequence is famous in math and nature - each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... You can see this pattern in sunflower seeds, pinecones, and even galaxies!"
        : "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n). Demonstrates basic C++ syntax, recursion, and I/O operations."
    },
    {
      id: "structure",
      title: "Program Structure",
      icon: Code,
      content: isBeginnerMode
        ? "Every C++ program has the same basic parts: 1) Include statements (like importing tools), 2) The 'main' function (where the program starts), and 3) Other functions we create. This program also has a 'fibonacci' function that we created to do the math calculations."
        : "Standard C++ program structure with preprocessor directives, namespace usage, function declarations, and the main entry point. Follows typical C++ organizational patterns."
    },
    {
      id: "algorithm",
      title: "How the Fibonacci Function Works",
      icon: Brain,
      content: isBeginnerMode
        ? "The fibonacci function is 'recursive' - it calls itself! Think of it like Russian nesting dolls. To find F(5), it needs F(4) and F(3). To find F(4), it needs F(3) and F(2), and so on, until it reaches F(0)=0 and F(1)=1. Then it builds the answer back up: F(2)=1, F(3)=2, F(4)=3, F(5)=5."
        : "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm with exponential time complexity."
    },
    {
      id: "improvements",
      title: "Making It Better",
      icon: Lightbulb,
      content: isBeginnerMode
        ? "This code is great for learning, but it's slow for big numbers because it recalculates the same values many times. Imagine asking 'What's 2+2?' a thousand times instead of remembering the answer! We could make it faster by storing previous answers or using a different approach."
        : "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient. Could also add input validation and error handling for production code."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🥋</span>
            <span>Cpp Sensei</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Main Workspace */}
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-5rem)]">
        {/* Code Editor Panel */}
        <div className="bg-card rounded-lg border shadow-sm flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="border-b p-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-primary/10 rounded text-sm font-semibold">⚡ C++</span>
              <div className="flex gap-1">
                <Button size="sm" onClick={handleRunCode}>
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </Button>
                <Button size="sm" variant="secondary" onClick={handleLineExplain}>
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Line-by-Line
                </Button>
                <Button size="sm" variant="outline" onClick={handleFullExplain}>
                  <BookOpen className="h-4 w-4 mr-1" />
                  Full Explain
                </Button>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDownloadCode}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-muted/30">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent resize-none outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Explanation Panel */}
        <div className="bg-card rounded-lg border shadow-sm flex flex-col overflow-hidden">
          {/* Panel Header */}
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg">
                {explanationMode === 'idle' && 'AI Explanations'}
                {explanationMode === 'line' && 'Line-by-Line Explanation'}
                {explanationMode === 'full' && 'Full Code Explanation'}
              </h2>
              {explanationMode !== 'idle' && (
                <span className="px-2 py-1 bg-primary/10 rounded text-xs font-semibold">
                  {explanationMode === 'line' ? 'Interactive' : 'Comprehensive'}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant={isBeginnerMode ? "default" : "outline"}
              onClick={() => {
                setIsBeginnerMode(!isBeginnerMode);
                toast({
                  title: `Switched to ${!isBeginnerMode ? 'beginner' : 'advanced'} mode`,
                  description: "Explanations will be adjusted to your level!",
                });
              }}
            >
              {isBeginnerMode ? <GraduationCap className="h-4 w-4 mr-1" /> : <Brain className="h-4 w-4 mr-1" />}
              {isBeginnerMode ? 'Beginner Mode' : 'Advanced Mode'}
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            {explanationMode === 'idle' && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Code className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="font-semibold text-lg mb-2">Ready to Learn!</h3>
                <p>Click "Line-by-Line" or "Full Explain" to get AI-powered explanations of your code.</p>
              </div>
            )}

            {explanationMode === 'line' && (
              <div className="space-y-4">
                {lineExplanations.map((item) => (
                  <div key={item.line} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 rounded text-xs font-semibold">
                        Line {item.line}
                      </span>
                      <code className="text-sm bg-background px-2 py-1 rounded">{item.code}</code>
                    </div>
                    <p className="text-sm leading-relaxed">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {explanationMode === 'full' && (
              <div className="space-y-2">
                {fullExplanations.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedSections.has(item.id);
                  return (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(item.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{item.title}</span>
                        </div>
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                      {isExpanded && (
                        <div className="p-4 pt-0 text-sm leading-relaxed">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
