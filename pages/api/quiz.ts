import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizTypes";
import { ErrorMessage } from "../../types/errorMessage";
import prisma from "../../prisma/client";

/**
 * API ENDPOINT: /api/quiz?quizId={quizId}
 *
 * DESCRIPTION:
 * - This returns the details of the quiz without the questions.
 * - It will also return the results of the quiz if the quiz has ended and the time has passed
 *
 */

interface Req extends NextApiRequest {
    query: {
        quizId: string;
        limit: string;
    };
}

export default async function handler(
    req: Req,
    res: NextApiResponse<QuizData | QuizData[] | ErrorMessage>
) {
    const {
        method,
        query: { quizId, limit },
    } = req;

    switch (method) {
        case "GET":
            const reqQuizId = Number(quizId) || undefined;
            try {
                if (reqQuizId) {
                    const data = await prisma.quiz.findFirst({
                        where: { quizId: reqQuizId },
                        include: {
                            quizEntry: true,
                        },
                    });
                    if (data) {
                        return res.status(200).json({
                            quizId: data.quizId,
                            name: data.name,
                            week: data.week,
                            description: data.description,
                            startDateTime: data.startDateTime,
                            ended: data.ended,
                            entries:
                                data.ended && data.startDateTime < new Date()
                                    ? data.quizEntry.sort(
                                          (a, b) => b.points - a.points
                                      )
                                    : undefined,
                        });
                    }
                    return res.status(404).send({
                        message: "Quiz not found",
                    });
                }
                // const retrieveLimit = Number(limit) || undefined;

                const data = await prisma.quiz.findMany({
                    include: {
                        quizEntry: true,
                    },
                });

                return res.status(200).json(
                    data
                        .sort((x) => x.quizId)
                        .map((quiz) => {
                            return {
                                quizId: quiz.quizId,
                                name: quiz.name,
                                week: quiz.week,
                                description: quiz.description,
                                startDateTime: quiz.startDateTime,
                                ended: quiz.ended,
                                entries:
                                    quiz.ended &&
                                    quiz.startDateTime < new Date()
                                        ? quiz.quizEntry.sort(
                                              (a, b) => b.points - a.points
                                          )
                                        : undefined,
                            };
                        })
                );
            } catch (error) {
                return res.status(500).json({
                    message: "Error retrieving quiz",
                    error: error,
                });
            }
    }

    return res.status(405).json({
        message: "Request method is not supported",
    });
}
