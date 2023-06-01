import { Quiz } from "@prisma/client";
import questionService from "./questionService";

interface GetQuizRequest {
    quizId: number;
}

interface CreateQuizRequest {
    name: string;
    week: number;
    description: string;
    startDateTime: Date;
    questions: {
        timeLimit: number;
        text: string;
        image?: string;
        points: number;
        options?: { correct: boolean; text: string }[];
    }[];
}

interface UpdateQuizRequest {
    quizId: number;
    name?: string;
    week?: number;
    description?: string;
    startDateTime?: Date;
}

interface DeleteQuizRequest {
    quizId: number;
}

const getAllQuizzes = async () => {
    const quizzes = await prisma.quiz.findMany({
        include: {
            question: {
                include: {
                    option: true,
                },
            },
            quizEntry: true,
        },
    });

    if (!quizzes) {
        throw Error("No quizzes found");
    }

    return quizzes;
};

const getQuiz = async (data: GetQuizRequest) => {
    const { quizId } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
        include: {
            question: {
                include: {
                    option: true,
                },
            },
            quizEntry: true,
        },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    return quiz;
};

const createQuiz = async (data: CreateQuizRequest) => {
    const { name, week, description, startDateTime, questions } = data;

    const newQuiz = await prisma.quiz.create({
        data: {
            name: name,
            week: week,
            description: description,
            startDateTime: startDateTime,
            ended: false,
        },
    });

    for (const q of questions) {
        await questionService.createQuestion({
            quizId: newQuiz.quizId,
            timeLimit: q.timeLimit,
            text: q.text,
            image: q.image,
            points: q.points,
            options: q.options,
        });
    }

    return newQuiz;
};

const updateQuiz = async (data: UpdateQuizRequest) => {
    const { quizId, name, week, description, startDateTime } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    const updatedQuiz = await prisma.quiz.update({
        where: { quizId },
        data: {
            name,
            week,
            description,
            startDateTime,
        },
    });

    return updatedQuiz;
};

const deleteQuiz = async (data: DeleteQuizRequest) => {
    const { quizId } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    const deletedQuiz = await prisma.quiz.delete({
        where: { quizId },
    });

    return deletedQuiz;
};

const quizService = {
    getAllQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
};

export default quizService;
