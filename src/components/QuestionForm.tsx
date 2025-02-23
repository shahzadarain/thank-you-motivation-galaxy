
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Question } from '@/types/question';
import SortableItem from './SortableItem';

interface QuestionFormProps {
  question: Question;
  answer: string | string[];
  onAnswerChange: (value: string | string[]) => void;
  onDragEnd?: (event: any) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  answer,
  onAnswerChange,
  onDragEnd,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (question.type === 'text') {
    return (
      <Textarea
        value={answer as string || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="min-h-[100px]"
        placeholder="Type your answer here..."
      />
    );
  }

  if (question.type === 'radio' && question.options) {
    return (
      <RadioGroup
        value={answer as string}
        onValueChange={onAnswerChange}
      >
        {question.options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === 'ranking' && question.teamMembers && onDragEnd) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={answer as string[] || question.teamMembers}
            strategy={verticalListSortingStrategy}
          >
            {(answer as string[] || question.teamMembers).map((member, index) => (
              <SortableItem key={member} id={member}>
                <div className="flex items-center">
                  <span className="mr-3 text-gray-500">{index + 1}.</span>
                  <span>{member}</span>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  return null;
};

export default QuestionForm;
