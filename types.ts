export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppStatus {
  SHOP = 'SHOP',
  CHECKOUT = 'CHECKOUT'
}

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  totalQuestions: number;
  score: number;
  userAnswers: number[];
  questions: Question[];
}