import { Question } from '@/types/question';

export const questions: Question[] = [
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
  },
  {
    id: 15,
    englishText: "Rank your teammates based on who you enjoy working with the most (drag to reorder)",
    arabicText: "رتب زملائك حسب من تستمتع بالعمل معهم أكثر (اسحب لإعادة الترتيب)",
    type: 'ranking',
    teamMembers: ['Shahzad', 'Dana', 'Iyad', 'Alaa', 'Ahmed', 'Joey', 'Khalid', 'Maysa', 'Jaber']
  }
];
