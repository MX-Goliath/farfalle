import { cn } from "@/lib/utils";
import {
  CameraIcon,
  ChevronDown,
  ListPlusIcon,
  SparkleIcon,
  StarIcon,
  TextSearchIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Section = ({
  title,
  children,
  animate = true,
  streaming = false,
  collapsible = false,
  defaultExpanded = true,
}: {
  title: "Sources" | "Answer" | "Related" | "Images";
  children: React.ReactNode;
  animate?: boolean;
  streaming?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const iconMap = {
    Sources: TextSearchIcon,
    Answer: SparkleIcon,
    Related: ListPlusIcon,
    Images: CameraIcon,
  };

  const IconComponent = iconMap[title] || StarIcon;

  const HeaderContent = () => (
    <>
      {title === "Answer" && streaming ? (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <IconComponent size={22} />
        </motion.div>
      ) : (
        <IconComponent size={22} />
      )}
      <div className="text-lg font-medium">{title}</div>
    </>
  );

  return (
    <div
      className={cn(
        "flex flex-col mb-8",
        animate ? "animate-in fade-in duration-1000 ease-out" : "",
      )}
    >
      {collapsible ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-2 -m-2 rounded-md hover:bg-card/50 transition-colors group"
        >
          <div className="flex items-center space-x-2">
            <HeaderContent />
          </div>
          <ChevronDown 
            size={18} 
            className={cn(
              "text-muted-foreground transition-transform duration-200 group-hover:text-foreground",
              isExpanded ? "rotate-180" : ""
            )} 
          />
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <HeaderContent />
        </div>
      )}
      
      {(!collapsible || isExpanded) && (
        <div 
          className={cn(
            "pt-1",
            collapsible && isExpanded ? "animate-in slide-in-from-top-2 duration-300 ease-out" : ""
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
