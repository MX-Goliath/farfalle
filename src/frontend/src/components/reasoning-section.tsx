import { useState, useEffect, useRef } from "react";
import { ChevronDown, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { MemoizedReactMarkdown } from "./markdown";
import rehypeRaw from "rehype-raw";

interface ReasoningSectionProps {
  reasoning: string;
  animate?: boolean;
  isStreaming?: boolean;
}

export const ReasoningSection = ({ 
  reasoning, 
  animate = true, 
  isStreaming = false 
}: ReasoningSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAutoExpanded = useRef(false);

  // Auto-expand only once when reasoning first appears during streaming
  useEffect(() => {
    if (isStreaming && reasoning.length > 0 && !hasAutoExpanded.current) {
      setIsExpanded(true);
      hasAutoExpanded.current = true;
    }
    // Reset the flag when streaming stops
    if (!isStreaming) {
      hasAutoExpanded.current = false;
    }
  }, [isStreaming, reasoning]);

  if (!reasoning) return null;

  return (
    <div 
      className={cn(
        "flex flex-col mb-8",
        animate ? "animate-in fade-in duration-1000 ease-out" : "",
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 border rounded-lg transition-colors bg-card hover:bg-card/80 cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <Brain size={22} className="text-foreground" />
          <div className={cn(
            "text-lg font-medium text-foreground",
            isStreaming ? "shimmer-text" : ""
          )}>
            Reasoning
          </div>
        </div>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-foreground transition-transform duration-200",
            isExpanded ? "rotate-180" : ""
          )} 
        />
      </button>
      
      {isExpanded && (
        <div 
          className={cn(
            "mt-2 p-4 bg-card border rounded-lg",
            "animate-in slide-in-from-top-2 duration-300 ease-out"
          )}
        >
          <MemoizedReactMarkdown
            className="prose dark:prose-invert prose-sm leading-relaxed break-words text-muted-foreground"
            rehypePlugins={[rehypeRaw]}
          >
            {reasoning}
          </MemoizedReactMarkdown>
        </div>
      )}
    </div>
  );
}; 