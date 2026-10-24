export type ExpenseCategory = 'repas' | 'transport' | 'loisirs';

export type MockMember = {
    id: string;
    name: string;
    tone:
        | 'primary'
        | 'primary-container'
        | 'secondary-container'
        | 'tertiary-container';
};

export const currentUser: MockMember = {
    id: 'you',
    name: 'Vous',
    tone: 'primary',
};

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
    amountValue: number;
    yourShare: string;
    yourShareIsPositive: boolean;
};

export const expenses: MockExpense[] = [
    {
        id: 'exp-1',
        date: '12 Oct 2026',
        description: 'Dîner Pizzeria Roma',
        category: 'repas',
        paidBy: { id: 'marc', name: 'Marc', tone: 'secondary-container' },
        amount: '45,000 FCFA',
        amountValue: 45000,
        yourShare: '-15,000 FCFA',
        yourShareIsPositive: false,
    },
    {
        id: 'exp-2',
        date: '10 Oct 2026',
        description: 'Billets de train Dakar',
        category: 'transport',
        paidBy: currentUser,
        amount: '120,000 FCFA',
        amountValue: 120000,
        yourShare: '+60,000 FCFA',
        yourShareIsPositive: true,
    },
    {
        id: 'exp-3',
        date: '08 Oct 2026',
        description: 'Location Airbnb Saly',
        category: 'loisirs',
        paidBy: { id: 'sophie', name: 'Sophie', tone: 'tertiary-container' },
        amount: '85,000 FCFA',
        amountValue: 85000,
        yourShare: '-28,333 FCFA',
        yourShareIsPositive: false,
    },
    {
        id: 'exp-4',
        date: '05 Oct 2026',
        description: 'Courses Supermarché',
        category: 'repas',
        paidBy: { id: 'marc', name: 'Marc', tone: 'secondary-container' },
        amount: '32,500 FCFA',
        amountValue: 32500,
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
        amount: '15,000 FCFA',
        involvesYou: false,
    },
    {
        id: 'settle-2',
        from: { id: 'tom', name: 'Tom', tone: 'secondary-container' },
        to: currentUser,
        amount: '5,000 FCFA',
        involvesYou: true,
    },
];

export type AnalyticsPeriod = 'semaine' | 'mois' | 'annee';

export type AnalyticsData = {
    subtitle: string;
    bars: { label: string; you: number; group: number }[];
    breakdown: { category: ExpenseCategory; label: string; percent: number }[];
    total: string;
    topSpender: { name: string; amount: string };
    summary: { youOwe: string; owedToYou: string };
};

export const analyticsByPeriod: Record<AnalyticsPeriod, AnalyticsData> = {
    semaine: {
        subtitle: 'Cette semaine vs la semaine dernière',
        bars: [
            { label: 'Lun', you: 20, group: 35 },
            { label: 'Mar', you: 45, group: 30 },
            { label: 'Mer', you: 25, group: 55 },
            { label: 'Jeu', you: 60, group: 40 },
            { label: 'Ven', you: 85, group: 70 },
            { label: 'Sam', you: 95, group: 80 },
            { label: 'Dim', you: 40, group: 50 },
        ],
        breakdown: [
            { category: 'repas', label: 'Alimentation', percent: 55 },
            { category: 'transport', label: 'Transport', percent: 30 },
            { category: 'loisirs', label: 'Loisirs', percent: 15 },
        ],
        total: '95K',
        topSpender: { name: 'Sophie K.', amount: '85K' },
        summary: { youOwe: '10 000 FCFA', owedToYou: '5 000 FCFA' },
    },
    mois: {
        subtitle: 'Ce mois-ci vs le mois dernier',
        bars: [
            { label: 'S1', you: 40, group: 60 },
            { label: 'S2', you: 70, group: 50 },
            { label: 'S3', you: 30, group: 80 },
            { label: 'S4', you: 90, group: 40 },
        ],
        breakdown: [
            { category: 'transport', label: 'Transport', percent: 45 },
            { category: 'repas', label: 'Alimentation', percent: 35 },
            { category: 'loisirs', label: 'Loisirs', percent: 20 },
        ],
        total: '450K',
        topSpender: { name: 'Marc D.', amount: '320K' },
        summary: { youOwe: '45 000 FCFA', owedToYou: '12 500 FCFA' },
    },
    annee: {
        subtitle: 'Cette année vs l\u2019année dernière',
        bars: [
            { label: 'T1', you: 55, group: 45 },
            { label: 'T2', you: 35, group: 65 },
            { label: 'T3', you: 80, group: 60 },
            { label: 'T4', you: 65, group: 90 },
        ],
        breakdown: [
            { category: 'loisirs', label: 'Loisirs', percent: 40 },
            { category: 'transport', label: 'Transport', percent: 35 },
            { category: 'repas', label: 'Alimentation', percent: 25 },
        ],
        total: '2,1M',
        topSpender: { name: 'Alex T.', amount: '1,2M' },
        summary: { youOwe: '180 000 FCFA', owedToYou: '95 000 FCFA' },
    },
};

export type MockMemberBalance = {
    member: MockMember;
    amount: string;
    positive: boolean;
};

export const memberBalances: MockMemberBalance[] = [
    { member: currentUser, amount: '+15,000 FCFA', positive: true },
    {
        member: { id: 'alex', name: 'Alex', tone: 'tertiary-container' },
        amount: '+22,500 FCFA',
        positive: true,
    },
    {
        member: { id: 'marc', name: 'Marc', tone: 'secondary-container' },
        amount: '-18,000 FCFA',
        positive: false,
    },
    {
        member: { id: 'sophie', name: 'Sophie', tone: 'tertiary-container' },
        amount: '-19,500 FCFA',
        positive: false,
    },
];
