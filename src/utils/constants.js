export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
  expense: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Travel', 'Other'],
};

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const CATEGORY_COLORS = {
  Food: '#6D5BFF',
  Transport: '#22C55E',
  Shopping: '#F59E0B',
  Entertainment: '#EC4899',
  Bills: '#3B82F6',
  Health: '#EF4444',
  Education: '#8B5CF6',
  Travel: '#14B8A6',
  Other: '#6B7280',
  Salary: '#22C55E',
  Freelance: '#6D5BFF',
  Investment: '#3B82F6',
  Gift: '#EC4899',
  'Other Income': '#14B8A6',
};

export const NAV_ITEMS = [
  { path: '/app/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/app/transactions', label: 'Transactions', icon: 'ArrowLeftRight' },
  { path: '/app/budgets', label: 'Budgets', icon: 'Wallet' },
  { path: '/app/goals', label: 'Goals', icon: 'Target' },
  { path: '/app/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/app/settings', label: 'Settings', icon: 'Settings' },
];

export const DEMO_TRANSACTIONS = [
  { id: '1', type: 'income', amount: 85000, category: 'Salary', note: 'Monthly salary', date: '2026-07-01' },
  { id: '2', type: 'expense', amount: 450, category: 'Food', note: 'Lunch at cafe', date: '2026-07-01' },
  { id: '3', type: 'expense', amount: 1200, category: 'Transport', note: 'Uber rides', date: '2026-06-30' },
  { id: '4', type: 'expense', amount: 3500, category: 'Shopping', note: 'Amazon order', date: '2026-06-29' },
  { id: '5', type: 'expense', amount: 899, category: 'Entertainment', note: 'Netflix + Spotify', date: '2026-06-28' },
  { id: '6', type: 'expense', amount: 2500, category: 'Bills', note: 'Electricity bill', date: '2026-06-27' },
  { id: '7', type: 'income', amount: 15000, category: 'Freelance', note: 'Web project', date: '2026-06-25' },
  { id: '8', type: 'expense', amount: 680, category: 'Health', note: 'Pharmacy', date: '2026-06-24' },
  { id: '9', type: 'expense', amount: 2200, category: 'Food', note: 'Groceries', date: '2026-06-22' },
  { id: '10', type: 'expense', amount: 15000, category: 'Education', note: 'Online course', date: '2026-06-20' },
  { id: '11', type: 'income', amount: 85000, category: 'Salary', note: 'Monthly salary', date: '2026-06-01' },
  { id: '12', type: 'expense', amount: 4200, category: 'Travel', note: 'Weekend trip', date: '2026-06-15' },
];

export const DEMO_BUDGETS = [
  { id: '1', month: '2026-07', categories: { Food: 8000, Transport: 3000, Shopping: 5000, Entertainment: 2000, Bills: 4000 } },
  { id: '2', month: '2026-06', categories: { Food: 8000, Transport: 3000, Shopping: 5000, Entertainment: 2000, Bills: 4000 } },
];

export const DEMO_GOALS = [
  { id: '1', title: 'MacBook Pro', targetAmount: 150000, savedAmount: 87500, deadline: '2026-12-31' },
  { id: '2', title: 'Emergency Fund', targetAmount: 200000, savedAmount: 120000, deadline: '2027-06-30' },
  { id: '3', title: 'Vacation to Bali', targetAmount: 80000, savedAmount: 32000, deadline: '2026-09-15' },
];
