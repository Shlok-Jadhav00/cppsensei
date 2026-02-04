import { 
  Play, Lightbulb, BookOpen, Copy, Download, 
  GraduationCap, Brain, Code, ChevronDown, ChevronRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";
import Layout from "@/components/layout/Layout";

const lineExplanationsData = [
  { line: 1, code: "// Welcome to CodeLearn!", beginnerExplanation: "This is a comment - it's just a note for humans to read. The computer ignores anything after '//' on a line.", advancedExplanation: "Single-line comment using C++'s // syntax. Comments are ignored by the compiler." },
  { line: 4, code: "#include <iostream>", beginnerExplanation: "This tells the computer to include a special toolbox called 'iostream' that lets us use input/output commands like 'cin' (input) and 'cout' (output). Think of it like importing a calculator app on your phone.", advancedExplanation: "Preprocessor directive that includes the iostream header file, providing access to standard input/output stream objects like cin and cout." },
  { line: 5, code: "using namespace std;", beginnerExplanation: "This is a shortcut that saves us from typing 'std::' before commands like cout. Instead of writing 'std::cout', we can just write 'cout'. It's like setting a nickname for a long name.", advancedExplanation: "Using directive that brings the standard namespace into the current scope, eliminating the need to prefix standard library functions with 'std::'." },
  { line: 7, code: "int fibonacci(int n) {", beginnerExplanation: "This creates a function (like a mini-program) called 'fibonacci'. It takes one whole number 'n' as input and will return a whole number back. The '{' starts the function's instructions.", advancedExplanation: "Function declaration defining fibonacci with integer parameter n and integer return type. Opening brace begins function body." },
  { line: 9, code: "if (n <= 1) {", beginnerExplanation: "This checks: 'Is n less than or equal to 1?' If yes (true), it will do what's inside the next set of brackets. This handles the simple cases: F(0)=0 and F(1)=1.", advancedExplanation: "Conditional statement checking base cases for the recursive function when n ≤ 1." },
  { line: 16, code: "int main() {", beginnerExplanation: "Every C++ program needs a 'main' function - this is where the program starts running, like the front door of a house. The computer always looks for 'main' first.", advancedExplanation: "Main function declaration - the entry point of every C++ program. Execution begins here." }
];

const fullExplanationsData = [
  { id: "overview", title: "What This Program Does", icon: Sparkles, beginnerContent: "This C++ program calculates and prints the first 10 Fibonacci numbers. The Fibonacci sequence is famous in math and nature - each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... You can see this pattern in sunflower seeds, pinecones, and even galaxies!", advancedContent: "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n). Demonstrates basic C++ syntax, recursion, and I/O operations." },
  { id: "structure", title: "Program Structure", icon: Code, beginnerContent: "Every C++ program has the same basic parts: 1) Include statements (like importing tools), 2) The 'main' function (where the program starts), and 3) Other functions we create. This program also has a 'fibonacci' function that we created to do the math calculations.", advancedContent: "Standard C++ program structure with preprocessor directives, namespace usage, function declarations, and the main entry point. Follows typical C++ organizational patterns." },
  { id: "algorithm", title: "How the Fibonacci Function Works", icon: Brain, beginnerContent: "The fibonacci function is 'recursive' - it calls itself! Think of it like Russian nesting dolls. To find F(5), it needs F(4) and F(3). To find F(4), it needs F(3) and F(2), and so on, until it reaches F(0)=0 and F(1)=1. Then it builds the answer back up: F(2)=1, F(3)=2, F(4)=3, F(5)=5.", advancedContent: "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm with exponential time complexity." },
  { id: "improvements", title: "Making It Better", icon: Lightbulb, beginnerContent: "This code is great for learning, but it's slow for big numbers because it recalculates the same values many times. Imagine asking 'What's 2+2?' a thousand times instead of remembering the answer! We could make it faster by storing previous answers or using a different approach.", advancedContent: "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient. Could also add input validation and error handling for production code." }
];

const Home = () => {
  const {
    isBeginnerMode,
    setIsBeginnerMode,
    explanationMode,
    setExplanationMode,
    code,
    setCode,
    expandedSections,
    toggleSection,
    lineNumbersRef,
    textareaRef,
    handleRunCode,
    handleLineExplain,
    handleFullExplain,
    handleCopyCode,
    handleDownloadCode,
    syncScroll,
    getLineNumbers,
  } = useAppContext();

  const lineExplanations = lineExplanationsData.map(item => ({
    ...item,
    explanation: isBeginnerMode ? item.beginnerExplanation : item.advancedExplanation
  }));

  const fullExplanations = fullExplanationsData.map(item => ({
    ...item,
    content: isBeginnerMode ? item.beginnerContent : item.advancedContent
  }));

  return (
    <Layout>
      <section className="h-[calc(100vh-4rem)]">
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
    </Layout>
  );
};

export default Home;
