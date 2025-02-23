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
  {
    id: 4,
    englishText: "Does the DAG team communicate effectively with ideas and updates?",
    arabicText: "هل يتواصل فريق DAG بشكل فعال مع الأفكار والتحديثات؟",
    type: 'text'
  },
  {
    id: 5,
    englishText: "If you could change something in the DAG environment, what would it be?",
    arabicText: "إذا كان بإمكانك تغيير شيء في بيئة DAG، ماذا سيكون؟",
    type: 'text'
  },
  {
    id: 6,
    englishText: "Do you have suggestions for monthly/Bi-weekly team activities?",
    arabicText: "هل لديك اقتراحات لأنشطة الفريق الشهرية/نصف الشهرية؟",
    type: 'text'
  },
  {
    id: 7,
    englishText: "How much enjoyable is it to work with your team members?",
    arabicText: "ما مدى متعة العمل مع أعضاء فريقك؟",
    type: 'text'
  },
  {
    id: 8,
    englishText: "Team gathering outside?",
    arabicText: "تجمع الفريق خارج العمل؟",
    type: 'radio',
    options: ['Yes', 'No', 'Suggest']
  },
  {
    id: 9,
    englishText: "What challenges did you face in your work this week, and how might we adjust our approach to address them?",
    arabicText: "ما التحديات التي واجهتها في عملك هذا الأسبوع، وكيف يمكننا تعديل نهجنا لمعالجتها؟",
    type: 'text'
  },
  {
    id: 10,
    englishText: "How well did our team communication work over the past week? What changes would you suggest?",
    arabicText: "ما مدى نجاح تواصل فريقنا خلال الأسبوع الماضي؟ ما التغييرات التي تقترحها؟",
    type: 'text'
  },
  {
    id: 11,
    englishText: "Were there any moments when you felt stuck or unsupported this week? If so, what would have helped you?",
    arabicText: "هل كانت هناك لحظات شعرت فيها بالعجز أو عدم الدعم هذا الأسبوع؟ إذا كان الأمر كذلك، ما الذي كان يمكن أن يساعدك؟",
    type: 'text'
  },
  {
    id: 12,
    englishText: "What improvements could be made to our processes or workflows to increase our effectiveness this week?",
    arabicText: "ما التحسينات التي يمكن إدخالها على عملياتنا أو سير العمل لزيادة فعاليتنا هذا الأسبوع؟",
    type: 'text'
  },
  {
    id: 13,
    englishText: "How can I, as your manager, adjust my actions or decisions to support the team better?",
    arabicText: "كيف يمكنني، بصفتي مديرك، تعديل أفعالي أو قراراتي لدعم الفريق بشكل أفضل؟",
    type: 'text'
  },
  {
    id: 14,
    englishText: "Is there anything else from this week that you believe we should discuss to enhance our team performance?",
    arabicText: "هل هناك أي شيء آخر من هذا الأسبوع تعتقد أنه يجب أن نناقشه لتحسين أداء فريقنا؟",
    type: 'text'
  }
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
