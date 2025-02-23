
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { arrayMove } from '@dnd-kit/sortable';
import { questions } from '@/constants/questions';
import QuestionForm from '@/components/QuestionForm';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const { toast } = useToast();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = (answers[currentQuestion.id] as string[] || currentQuestion.teamMembers)
        .indexOf(active.id);
      const newIndex = (answers[currentQuestion.id] as string[] || currentQuestion.teamMembers)
        .indexOf(over.id);
      
      const newOrder = arrayMove(
        answers[currentQuestion.id] as string[] || currentQuestion.teamMembers || [],
        oldIndex,
        newIndex
      );
      
      handleAnswerChange(newOrder);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>

          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.englishText}
              </h2>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 text-right">
                {currentQuestion.arabicText}
              </h2>
            </div>

            <div className="space-y-4">
              <QuestionForm
                question={currentQuestion}
                answer={answers[currentQuestion.id] || ''}
                onAnswerChange={handleAnswerChange}
                onDragEnd={handleDragEnd}
              />
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(prev => prev - 1);
                  }
                }}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (currentStep < questions.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    console.log('Form submitted:', answers);
                    toast({
                      title: "Thank you for your feedback!",
                      description: "Your response has been recorded successfully.",
                    });
                    setAnswers({});
                    setCurrentStep(0);
                  }
                }}
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
