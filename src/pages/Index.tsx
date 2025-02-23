import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { arrayMove } from '@dnd-kit/sortable';
import { questions } from '@/constants/questions';
import QuestionForm from '@/components/QuestionForm';
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import FunFact from '@/components/FunFact';

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
    <div className="min-h-screen form-container py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card p-8 rounded-xl shadow-xl">
            <div className="mb-8">
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-3 rounded-full overflow-hidden bg-white/30"
                />
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
                  style={{ width: `${progress}%` }}
                  animate={{ x: [-20, 20], opacity: [0.2, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3 flex items-center justify-between">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span className="text-primary font-medium">{Math.round(progress)}% Complete</span>
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {currentQuestion.englishText}
                    </h2>
                    <FunFact questionNumber={currentStep + 1} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 text-right font-arabic">
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

                <motion.div 
                  className="flex justify-between pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0}
                    className="bg-white/50 hover:bg-white/80 transition-colors duration-300"
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
                          title: "🎉 Thank you for your feedback!",
                          description: "Your response has been recorded successfully.",
                        });
                        setAnswers({});
                        setCurrentStep(0);
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    <span>{currentStep === questions.length - 1 ? "Submit" : "Next"}</span>
                    {currentStep === questions.length - 1 && (
                      <Sparkles className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
