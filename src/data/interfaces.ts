export const CATEGORIES = [
  'Groceries',
  'Salary',
  'Entertainment',
  'Cloth',
  'Travel',
] as const;

export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: TransactionType;
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES];
  date: Date;
}

export type Transactions = Transaction[];

export type Filters = Record<string, string>;
