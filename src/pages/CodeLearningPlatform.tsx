import { useState } from "react";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import ExplanationPanel from "@/components/ExplanationPanel";
import AIChatbox from "@/components/AIChatbox";
import { useToast } from "@/hooks/use-toast";

const CodeLearningPlatform = () => {
  const [isDark, setIsDark] = useState(false);
  const [explanationMode, setExplanationMode] = useState<'line' | 'full' | 'idle'>('idle');
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    toast({
      title: `Switched to ${!isDark ? 'dark' : 'light'} mode`,
      description: "Theme updated successfully!",
    });
  };

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

  const toggleBeginnerMode = () => {
    setIsBeginnerMode(!isBeginnerMode);
    toast({
      title: `Switched to ${!isBeginnerMode ? 'beginner' : 'advanced'} mode`,
      description: "Explanations will be adjusted to your level!",
    });
  };

  return (
    <div className={`min-h-screen bg-background font-ui ${isDark ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Workspace */}
      <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
        {/* Left Panel - Code Editor */}
        <div className="flex-1 min-w-0">
          <CodeEditor
            onRunCode={handleRunCode}
            onLineExplain={handleLineExplain}
            onFullExplain={handleFullExplain}
          />
        </div>

        {/* Right Panel - Explanation Panel */}
        <div className="w-96 min-w-96">
          <ExplanationPanel
            mode={explanationMode}
            isBeginnerMode={isBeginnerMode}
            onToggleMode={toggleBeginnerMode}
          />
        </div>
      </div>

      {/* AI Chatbox */}
      <AIChatbox />
    </div>
  );
};

export default CodeLearningPlatform;