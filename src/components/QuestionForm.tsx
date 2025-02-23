
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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Question } from '@/types/question';
import SortableItem from './SortableItem';
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 rounded-xl"
      >
        <Textarea
          value={answer as string || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[100px] bg-white/50 backdrop-blur-sm border-2 focus:border-primary transition-all duration-300"
          placeholder="Type your answer here..."
        />
      </motion.div>
    );
  }

  if (question.type === 'radio' && question.options) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 rounded-xl space-y-4"
      >
        <RadioGroup
          value={answer as string}
          onValueChange={onAnswerChange}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 p-4 hover:bg-white/50 rounded-lg transition-colors duration-300"
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-pointer text-lg">{option}</Label>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    );
  }

  if (question.type === 'ranking' && question.teamMembers && onDragEnd) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
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
                  <span className="mr-3 text-primary font-bold">{index + 1}.</span>
                  <span>{member}</span>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </motion.div>
    );
  }

  return null;
};

export default QuestionForm;
