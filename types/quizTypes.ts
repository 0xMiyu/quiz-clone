// Include results only after the quiz has ended
export type QuizData = {
    quizId: number;
    name: string;
    week: number;
    description: string;
    startDateTime: Date;
    ended: boolean;
    entries?: QuizEntry[];
};

export type QuizEntry = {
    quizEntryId: number;
    publicKey: string;
    quizId: number;
    points: number;
    numOfCorrect: number;
    ranking: number | null;
};

export type QuizOfTheWeekData = {
    quizId: number;
    week: number;
};

// wip
export type QuestionData = {
    questionId: number;
    quizId: number;
    timelimit: number;
    text: string;
    image: string;
    points: number;
    option: OptionData[];
} | null;

export type OptionData = {
    optionId: number;
    questionId: number;
    text: string;
};

export type QuizAdminData = {
    quizId: number;
    name: string;
    week: number;
    description: string;
    startDateTime: Date;
    ended: boolean;
    questions: QuestionAdminData[];
    entry: QuizEntry[];
};

export type QuestionAdminData = {
    questionId: number;
    quizId: number;
    timelimit: number;
    text: string;
    image: string;
    points: number;
    option: OptionServerData[];
};

export type OptionServerData = {
    optionId: number;
    questionId: number;
    correct: boolean;
    text: string;
};
