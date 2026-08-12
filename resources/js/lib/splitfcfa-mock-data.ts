export type ExpenseCategory = 'repas' | 'transport' | 'loisirs';

export type MockMember = {
    id: string;
    name: string;
    tone: 'primary' | 'primary-container' | 'secondary-container' | 'tertiary-container';
};

export const currentUser: MockMember = { id: 'you', name: 'Vous', tone: 'primary' };

export const groupMembers: MockMember[] = [
    currentUser,
    { id: 'alex', name: 'Alex', tone: 'tertiary-container' },
    { id: 'marc', name: 'Marc', tone: 'secondary-container' },
    { id: 'sophie', name: 'Sophie', tone: 'tertiary-container' },
];

export const currentGroup = {
    name: 'Weekend Trip',
    stats: {
        groupTotal: '450k',
        yourBalance: '+15k',
        toReceive: '25k',
        toPay: '10k',
    },
};

export type MockExpense = {
    id: string;
    date: string;
    description: string;
    category: ExpenseCategory;
    paidBy: MockMember;
    amount: string;
    yourShare: string;
    yourShareIsPositive: boolean;
};

export const expenses: MockExpense[] = [
    {
        id: 'exp-1',
        date: '12 Oct 2023',
        description: 'Dîner Pizzeria Roma',
        category: 'repas',
        paidBy: { id: 'marc', name: 'Marc', tone: 'secondary-container' },
        amount: '45,000 FCFA',
        yourShare: '-15,000 FCFA',
        yourShareIsPositive: false,
    },
    {
        id: 'exp-2',
        date: '10 Oct 2023',
        description: 'Billets de train Dakar',
        category: 'transport',
        paidBy: currentUser,
        amount: '120,000 FCFA',
        yourShare: '+60,000 FCFA',
        yourShareIsPositive: true,
    },
    {
        id: 'exp-3',
        date: '08 Oct 2023',
        description: 'Location Airbnb Saly',
        category: 'loisirs',
        paidBy: { id: 'sophie', name: 'Sophie', tone: 'tertiary-container' },
        amount: '85,000 FCFA',
        yourShare: '-28,333 FCFA',
        yourShareIsPositive: false,
    },
    {
        id: 'exp-4',
        date: '05 Oct 2023',
        description: 'Courses Supermarché',
        category: 'repas',
        paidBy: { id: 'marc', name: 'Marc', tone: 'secondary-container' },
        amount: '32,500 FCFA',
        yourShare: '-10,833 FCFA',
        yourShareIsPositive: false,
    },
];

export type MockSettlement = {
    id: string;
    from: MockMember;
    to: MockMember;
    amount: string;
    involvesYou: boolean;
};

export const settlements: MockSettlement[] = [
    {
        id: 'settle-1',
        from: { id: 'sarah', name: 'Sarah', tone: 'tertiary-container' },
        to: { id: 'alex', name: 'Alex', tone: 'primary-container' },
        amount: '15.000 FCFA',
        involvesYou: false,
    },
    {
        id: 'settle-2',
        from: { id: 'tom', name: 'Tom', tone: 'secondary-container' },
        to: currentUser,
        amount: '5.000 FCFA',
        involvesYou: true,
    },
];

export const analytics = {
    weeks: [
        { label: 'S1', you: 40, group: 60 },
        { label: 'S2', you: 70, group: 50 },
        { label: 'S3', you: 30, group: 80 },
        { label: 'S4', you: 90, group: 40 },
    ],
    breakdown: [
        { category: 'transport' as ExpenseCategory, label: 'Transport', percent: 45 },
        { category: 'repas' as ExpenseCategory, label: 'Alimentation', percent: 35 },
        { category: 'loisirs' as ExpenseCategory, label: 'Loisirs', percent: 20 },
    ],
    total: '840K',
    topSpender: { name: 'Marc D.', amount: '320K' },
    monthSummary: { youOwe: '45 000 FCFA', owedToYou: '12 500 FCFA' },
};
