
export interface Question {
  id: number;
  englishText: string;
  arabicText: string;
  type: 'text' | 'radio' | 'rating' | 'ranking';
  options?: string[];
  teamMembers?: string[];
}
