import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Lightbulb, BookOpen, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  onRunCode: () => void;
  onLineExplain: () => void;
  onFullExplain: () => void;
}

const CodeEditor = ({ onRunCode, onLineExplain, onFullExplain }: CodeEditorProps) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(`# Welcome to CodeLearn! 
# Let's start with a simple Python example

def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Test the function
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Try running this code or get explanations!`);

  const languages = [
    { value: "python", label: "Python", icon: "🐍" },
    { value: "javascript", label: "JavaScript", icon: "🟨" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "⚡" },
    { value: "csharp", label: "C#", icon: "🔷" },
    { value: "rust", label: "Rust", icon: "🦀" },
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${selectedLanguage === "cpp" ? "cpp" : selectedLanguage === "csharp" ? "cs" : selectedLanguage}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border shadow-sm">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30 rounded-t-2xl">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48 font-ui">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.icon}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={onRunCode} className="gap-2 font-ui">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button variant="secondary" size="sm" onClick={onLineExplain} className="gap-2 font-ui">
              <Lightbulb className="h-4 w-4" />
              Line-by-Line
            </Button>
            <Button variant="accent" size="sm" onClick={onFullExplain} className="gap-2 font-ui">
              <BookOpen className="h-4 w-4" />
              Full Explain
            </Button>
          </div>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={copyCode}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={downloadCode}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-code-bg rounded-b-2xl">
          {/* Line Numbers */}
          <div className="flex h-full">
            <div className="w-12 bg-muted/20 border-r border-muted/40 p-2 rounded-bl-2xl">
              <div className="text-xs font-code text-code-comment space-y-1">
                {code.split('\n').map((_, index) => (
                  <div key={index} className="text-right pr-2 leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-code-foreground font-code text-sm leading-6 resize-none outline-none"
                style={{
                  fontFamily: 'Fira Code, monospace',
                  fontFeatureSettings: '"liga" 1, "calt" 1',
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;