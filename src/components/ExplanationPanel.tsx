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
      code: "# Welcome to CodeLearn!",
      explanation: isBeginnerMode 
        ? "This is a comment - it's just a note for humans and doesn't run as code."
        : "Comment line using Python's # syntax for single-line comments.",
    },
    {
      line: 4,
      code: "def fibonacci(n):",
      explanation: isBeginnerMode
        ? "This creates a function named 'fibonacci' that takes one input called 'n'."
        : "Function definition using def keyword, defining fibonacci function with parameter n.",
    },
    {
      line: 5,
      code: '"""Calculate the nth Fibonacci number"""',
      explanation: isBeginnerMode
        ? "This is a description of what the function does - it's called a docstring."
        : "Triple-quoted docstring providing function documentation and purpose.",
    },
    {
      line: 6,
      code: "if n <= 1:",
      explanation: isBeginnerMode
        ? "This checks if 'n' is 1 or less. It's like asking a yes/no question."
        : "Conditional statement checking base case for recursion when n ≤ 1.",
    },
  ];

  // Dummy data for full explanations
  const fullExplanations = [
    {
      id: "overview",
      title: "Code Overview",
      icon: <Sparkles className="h-5 w-5" />,
      content: isBeginnerMode
        ? "This code calculates Fibonacci numbers - a famous sequence where each number is the sum of the two numbers before it (0, 1, 1, 2, 3, 5, 8, 13...)."
        : "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n).",
    },
    {
      id: "algorithm",
      title: "Algorithm Explanation",
      icon: <Brain className="h-5 w-5" />,
      content: isBeginnerMode
        ? "The function calls itself with smaller numbers until it reaches the simple cases (0 or 1), then builds the answer back up."
        : "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm.",
    },
    {
      id: "improvements",
      title: "Potential Improvements",
      icon: <Lightbulb className="h-5 w-5" />,
      content: isBeginnerMode
        ? "This code is easy to understand but slow for big numbers. We could make it faster by remembering previous calculations."
        : "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient.",
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