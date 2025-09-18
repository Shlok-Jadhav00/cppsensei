import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GraduationCap, Brain, ChevronDown, ChevronRight, Lightbulb, Code, Sparkles } from "lucide-react";

interface ExplanationPanelProps {
  mode: 'line' | 'full' | 'idle';
  isBeginnerMode: boolean;
  onToggleMode: () => void;
}

const ExplanationPanel = ({ mode, isBeginnerMode, onToggleMode }: ExplanationPanelProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Dummy data for line-by-line explanations
  const lineExplanations = [
    {
      line: 1,
      code: "// Welcome to CodeLearn!",
      explanation: isBeginnerMode 
        ? "This is a comment - it's just a note for humans to read. The computer ignores anything after '//' on a line."
        : "Single-line comment using C++'s // syntax. Comments are ignored by the compiler.",
    },
    {
      line: 4,
      code: "#include <iostream>",
      explanation: isBeginnerMode
        ? "This tells the computer to include a special toolbox called 'iostream' that lets us use input/output commands like 'cin' (input) and 'cout' (output). Think of it like importing a calculator app on your phone."
        : "Preprocessor directive that includes the iostream header file, providing access to standard input/output stream objects like cin and cout.",
    },
    {
      line: 5,
      code: "using namespace std;",
      explanation: isBeginnerMode
        ? "This is a shortcut that saves us from typing 'std::' before commands like cout. Instead of writing 'std::cout', we can just write 'cout'. It's like setting a nickname for a long name."
        : "Using directive that brings the standard namespace into the current scope, eliminating the need to prefix standard library functions with 'std::'.",
    },
    {
      line: 7,
      code: "int fibonacci(int n) {",
      explanation: isBeginnerMode
        ? "This creates a function (like a mini-program) called 'fibonacci'. It takes one whole number 'n' as input and will return a whole number back. The '{' starts the function's instructions."
        : "Function declaration defining fibonacci with integer parameter n and integer return type. Opening brace begins function body.",
    },
    {
      line: 8,
      code: "// Calculate the nth Fibonacci number",
      explanation: isBeginnerMode
        ? "Another comment explaining what this function does - it calculates Fibonacci numbers (a special sequence: 0, 1, 1, 2, 3, 5, 8...)."
        : "Comment documenting the function's purpose.",
    },
    {
      line: 9,
      code: "if (n <= 1) {",
      explanation: isBeginnerMode
        ? "This checks: 'Is n less than or equal to 1?' If yes (true), it will do what's inside the next set of brackets. This handles the simple cases: F(0)=0 and F(1)=1."
        : "Conditional statement checking base cases for the recursive function when n ≤ 1.",
    },
    {
      line: 10,
      code: "return n;",
      explanation: isBeginnerMode
        ? "This gives back the answer and stops the function. If n is 0, it returns 0. If n is 1, it returns 1. The 'return' command is like saying 'here's your answer!'"
        : "Returns the value of n for base cases (F(0)=0, F(1)=1).",
    },
    {
      line: 11,
      code: "} else {",
      explanation: isBeginnerMode
        ? "If the 'if' condition was false (n is greater than 1), then do what's in this section instead."
        : "Else clause handling the recursive case when n > 1.",
    },
    {
      line: 12,
      code: "return fibonacci(n-1) + fibonacci(n-2);",
      explanation: isBeginnerMode
        ? "This is the heart of Fibonacci! It says: 'To get F(n), add F(n-1) + F(n-2)'. So F(5) = F(4) + F(3). The function calls itself with smaller numbers until it reaches the simple cases."
        : "Recursive call implementing the Fibonacci formula: F(n) = F(n-1) + F(n-2).",
    },
    {
      line: 13,
      code: "}",
      explanation: isBeginnerMode
        ? "This closes the 'else' section."
        : "Closing brace for the else block.",
    },
    {
      line: 14,
      code: "}",
      explanation: isBeginnerMode
        ? "This closes the entire fibonacci function."
        : "Closing brace for the fibonacci function.",
    },
    {
      line: 16,
      code: "int main() {",
      explanation: isBeginnerMode
        ? "Every C++ program needs a 'main' function - this is where the program starts running, like the front door of a house. The computer always looks for 'main' first."
        : "Main function declaration - the entry point of every C++ program. Execution begins here.",
    },
    {
      line: 17,
      code: "// Test the function",
      explanation: isBeginnerMode
        ? "A comment explaining that we're about to test our fibonacci function to see if it works correctly."
        : "Comment indicating the following code will test the fibonacci function.",
    },
    {
      line: 18,
      code: "for (int i = 0; i < 10; i++) {",
      explanation: isBeginnerMode
        ? "This is a loop that repeats 10 times. 'int i = 0' creates a counter starting at 0. 'i < 10' means keep going while i is less than 10. 'i++' means add 1 to i after each round."
        : "For loop iterating from 0 to 9, testing the fibonacci function with different values.",
    },
    {
      line: 19,
      code: 'cout << "F(" << i << ") = " << fibonacci(i) << endl;',
      explanation: isBeginnerMode
        ? "'cout' prints text to the screen. This prints something like 'F(0) = 0', 'F(1) = 1', etc. The '<<' sends information to cout, and 'endl' makes a new line."
        : "Output statement using cout to display the fibonacci number for each value of i, with endl for line termination.",
    },
    {
      line: 20,
      code: "}",
      explanation: isBeginnerMode
        ? "This closes the for loop."
        : "Closing brace for the for loop.",
    },
    {
      line: 21,
      code: "return 0;",
      explanation: isBeginnerMode
        ? "This tells the operating system 'the program finished successfully!' Returning 0 means 'no errors occurred' - like giving a thumbs up."
        : "Returns 0 to indicate successful program termination to the operating system.",
    },
    {
      line: 22,
      code: "}",
      explanation: isBeginnerMode
        ? "This closes the main function, which means the program is complete."
        : "Closing brace for the main function.",
    },
  ];

  // Dummy data for full explanations
  const fullExplanations = [
    {
      id: "overview",
      title: "What This Program Does",
      icon: <Sparkles className="h-5 w-5" />,
      content: isBeginnerMode
        ? "This C++ program calculates and prints the first 10 Fibonacci numbers. The Fibonacci sequence is famous in math and nature - each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... You can see this pattern in sunflower seeds, pinecones, and even galaxies!"
        : "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n). Demonstrates basic C++ syntax, recursion, and I/O operations.",
    },
    {
      id: "structure",
      title: "Program Structure",
      icon: <Code className="h-5 w-5" />,
      content: isBeginnerMode
        ? "Every C++ program has the same basic parts: 1) Include statements (like importing tools), 2) The 'main' function (where the program starts), and 3) Other functions we create. This program also has a 'fibonacci' function that we created to do the math calculations."
        : "Standard C++ program structure with preprocessor directives, namespace usage, function declarations, and the main entry point. Follows typical C++ organizational patterns.",
    },
    {
      id: "algorithm",
      title: "How the Fibonacci Function Works",
      icon: <Brain className="h-5 w-5" />,
      content: isBeginnerMode
        ? "The fibonacci function is 'recursive' - it calls itself! Think of it like Russian nesting dolls. To find F(5), it needs F(4) and F(3). To find F(4), it needs F(3) and F(2), and so on, until it reaches F(0)=0 and F(1)=1. Then it builds the answer back up: F(2)=1, F(3)=2, F(4)=3, F(5)=5."
        : "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm with exponential time complexity.",
    },
    {
      id: "cpp-basics",
      title: "C++ Basics Explained",
      icon: <GraduationCap className="h-5 w-5" />,
      content: isBeginnerMode
        ? "C++ is a powerful programming language! Key concepts here: 'int' means whole numbers, 'iostream' gives us input/output powers, 'cout' prints to screen, 'for' loops repeat actions, and functions are like mini-programs that do specific jobs. The '{' and '}' are like parentheses - they group things together."
        : "Demonstrates fundamental C++ concepts: data types (int), standard library usage (iostream), I/O operations (cout), control structures (for, if-else), and function definitions with parameters and return values.",
    },
    {
      id: "improvements",
      title: "Making It Better",
      icon: <Lightbulb className="h-5 w-5" />,
      content: isBeginnerMode
        ? "This code is great for learning, but it's slow for big numbers because it recalculates the same values many times. Imagine asking 'What's 2+2?' a thousand times instead of remembering the answer! We could make it faster by storing previous answers or using a different approach."
        : "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient. Could also add input validation and error handling for production code.",
    },
  ];

  if (mode === 'idle') {
    return (
      <div className="flex flex-col h-full bg-card rounded-2xl border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-ui text-foreground">AI Explanations</h2>
            <Button
              variant={isBeginnerMode ? "accent" : "secondary"}
              size="sm"
              onClick={onToggleMode}
              className="gap-2 font-ui"
            >
              {isBeginnerMode ? (
                <>
                  <GraduationCap className="h-4 w-4" />
                  Beginner Mode
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Advanced Mode
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-playful rounded-2xl flex items-center justify-center">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold font-ui text-foreground">Ready to Learn!</h3>
              <p className="text-muted-foreground font-ui">
                Click "Line-by-Line" or "Full Explain" to get AI-powered explanations of your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border shadow-sm">
      {/* Panel Header */}
      <div className="p-4 border-b bg-muted/30 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-ui text-foreground">
              {mode === 'line' ? 'Line-by-Line Explanation' : 'Full Code Explanation'}
            </h2>
            <Badge variant={mode === 'line' ? "secondary" : "default"} className="font-ui">
              {mode === 'line' ? 'Interactive' : 'Comprehensive'}
            </Badge>
          </div>
          
          <Button
            variant={isBeginnerMode ? "accent" : "secondary"}
            size="sm"
            onClick={onToggleMode}
            className="gap-2 font-ui"
          >
            {isBeginnerMode ? (
              <>
                <GraduationCap className="h-4 w-4" />
                Beginner
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Advanced
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {mode === 'line' ? (
          // Line-by-line explanations
          <div className="space-y-3">
            {lineExplanations.map((item) => (
              <Card key={item.line} className="border border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-code">
                      Line {item.line}
                    </Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded font-code">
                      {item.code}
                    </code>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-ui leading-relaxed">
                    {item.explanation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Full explanations
          <div className="space-y-3">
            {fullExplanations.map((section) => (
              <Collapsible
                key={section.id}
                open={openSections[section.id]}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer border border-accent/20 hover:border-accent/40 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-ui flex items-center gap-2">
                          {section.icon}
                          {section.title}
                        </CardTitle>
                        {openSections[section.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 border-accent/20">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground font-ui leading-relaxed">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;