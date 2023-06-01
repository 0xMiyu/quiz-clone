export interface QuizWithQuestionOptionEntry {
    quizId:        number;
    name:          string;
    week:          number;
    description:   string;
    startDateTime: Date;
    ended:         boolean;
    question:      QuestionWithOption[];
    quizEntry:     QuizEntry[];
}

export interface QuizWithQuestionOption {
    quizId:        number;
    name:          string;
    week:          number;
    description:   string;
    startDateTime: Date;
    ended:         boolean;
    question:      QuestionWithOption[];
}


export interface QuestionWithOption {
    quizId:     number;
    questionId: number;
    timeLimit:  number;
    text:       string;
    image:      string | null;
    points:     number;
    option:     Option[];
}

export interface Option {
    optionId:   number;
    questionId: number;
    quizId:     number;
    correct:    boolean;
    text:       string;
}

export interface QuizEntry {
    quizEntryId:  number;
    publicKey:    string;
    quizId:       number;
    points:       number;
    numOfCorrect: number;
    ranking:      number | null;
}
