
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
      const response = await fetch(`http://numbersapi.com/${questionNumber}/trivia`);
      const fact = await response.text();
      
      toast({
        title: "Did you know? 🤔",
        description: fact,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Couldn't fetch a fun fact right now. Try again later!",
        variant: "destructive",
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
