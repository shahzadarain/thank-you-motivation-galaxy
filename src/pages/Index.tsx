
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  englishText: string;
  arabicText: string;
  type: 'text' | 'radio' | 'rating';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    englishText: "To whom do you want to say 'Thank you' today and why?",
    arabicText: "لمن تريد أن تقول 'شكراً' اليوم ولماذا؟",
    type: 'text'
  },
  {
    id: 2,
    englishText: "Are you motivated?",
    arabicText: "هل أنت متحمس؟",
    type: 'radio',
    options: ['Yes', 'No']
  },
  {
    id: 3,
    englishText: "What is something that makes you motivated?",
    arabicText: "ما الذي يجعلك متحمساً؟",
    type: 'text'
  },
  // Add other questions here...
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', answers);
    toast({
      title: "Thank you for your feedback!",
      description: "Your response has been recorded successfully.",
      duration: 5000,
    });
    setAnswers({});
    setCurrentStep(0);
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen form-container py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="glass-card p-6 animate-fade-in">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>

          <div className="space-y-6">
            <div className="ltr mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.englishText}
              </h2>
            </div>
            
            <div className="rtl mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.arabicText}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.type === 'text' ? (
                <Textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value
                  }))}
                  className="min-h-[100px]"
                  placeholder="Type your answer here..."
                />
              ) : currentQuestion.type === 'radio' && currentQuestion.options ? (
                <RadioGroup
                  value={answers[currentQuestion.id]}
                  onValueChange={(value) => setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: value
                  }))}
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : null}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
              >
                {currentStep === questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
