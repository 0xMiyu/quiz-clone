import type { NextApiRequest, NextApiResponse } from "next";
import { QuizAdminData } from "../../../../../types/quizTypes";
import { ErrorMessage } from "../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../middlewares/authAdminMiddleware";
import quizService from "../../../../../service/quizService";
import { QuizWithQuestionOptionEntry } from "../../../../../types/backendReturnTypes";
import { Quiz } from "@prisma/client";

interface UpdateQuizRequest {
    name?: string;
    week?: number;
    description?: string;
    startDateTime?: Date;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;

    const quizId = Number(req.query.quizId as string);

    switch (method) {
        case "GET":
            try {
                const quiz: QuizWithQuestionOptionEntry = await quizService.getQuiz({ quizId });
                return res.status(200).json(quiz);
            } catch (error: any) {
                if (error.message === "Quiz not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error finding quiz",
                    error: error,
                });
            }
        case "PUT":
            try {
                const {
                    name,
                    week,
                    description,
                    startDateTime,
                }: UpdateQuizRequest = body;

                if (!name && !week && !description && !startDateTime) {
                    return res
                        .status(400)
                        .json({ message: "No update params provided" });
                }

                if (startDateTime) {
                    const testDateTime = new Date(startDateTime);
                    if (
                        startDateTime.getFullYear() > 2030 ||
                        startDateTime.getFullYear() < 2020
                    ) {
                        return res.status(400).json({
                            message:
                                "Please enter a date with year between 2020 and 2030",
                        });
                    }
                }

                const updatedQuiz: Quiz = await quizService.updateQuiz({
                    quizId,
                    name,
                    week,
                    description,
                    startDateTime,
                });

                return res.status(200).json(updatedQuiz);
            } catch (error: any) {
                if (error.message === "Quiz not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error updating quiz",
                    error: error,
                });
            }

        case "DELETE":
            try {
                const deletedQuiz = await quizService.deleteQuiz({ quizId });
                return res
                    .status(200)
                    .json({ message: "Quiz deleted successfully" });
            } catch (error: any) {
                if (error.message === "Quiz not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error deleting quiz",
                    error: error,
                });
            }
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
