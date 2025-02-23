
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lightbulb } from "lucide-react";

interface FunFactProps {
  questionNumber: number;
}

const FunFact: React.FC<FunFactProps> = ({ questionNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchFunFact = async () => {
    setIsLoading(true);
    try {
      // Using a secure API endpoint
      const response = await fetch(`https://api.math.tools/numbers/nod/${questionNumber}`);
      const data = await response.json();
      
      toast({
        title: "Did you know? 🤔",
        description: `${questionNumber} is ${data.contents.translation}`,
        duration: 5000,
      });
    } catch (error) {
      // Fallback to a predefined fact if API fails
      const facts = [
        "Did you know? Taking breaks while filling forms helps maintain focus!",
        "Fun fact: Deep breathing can help reduce stress while answering questions.",
        "Interesting! Writing down thoughts can boost memory and creativity.",
        "Quick tip: Stretching between questions can improve your concentration!",
        "Did you know? Your brain processes information better when you're relaxed.",
      ];
      
      toast({
        title: "Here's something interesting! 💡",
        description: facts[Math.floor(Math.random() * facts.length)],
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 transition-colors duration-200"
            onClick={fetchFunFact}
            disabled={isLoading}
          >
            <Lightbulb 
              className={`h-5 w-5 ${isLoading ? 'animate-pulse' : 'animate-bounce'}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click for a fun fact!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FunFact;
