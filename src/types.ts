export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialQuery: string;
  expectedResult: any[];
  hint: string;
  explanation: string;
  schema: string;
}

export interface ChallengeState {
  currentQuery: string;
  isCorrect: boolean | null;
  showHint: boolean;
  showExplanation: boolean;
}