import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import NavBar from "../../components/landing/NavBar";
import QuizPageWaiting from "../../components/quiz-page/QuizPageWaiting";
import { getSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import { QuizData } from "../../types/quizTypes";
import QuizResult from "../../components/quiz-page/QuizResult";
import LiveQuiz from "../../components/quiz-page/LiveQuiz";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        throw error;
    }

    return res.json();
};

function QuizIndividualPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const wallet = useWallet();
    const { data, error, isLoading } = useSWR<QuizData, Error>(
        `/api/quiz?quizId=${props.quizId}`,
        fetcher
    );
    if (error) {
        console.log(error.message);
    }
    return (
        <NavBar>
            <Head>
                <title>Trivia</title>
            </Head>
            {data && data.ended && (
                <QuizResult
                    startDateTime={new Date(data.startDateTime)}
                    week={data.week}
                    name={data.name}
                    // result={data.results}
                ></QuizResult>
            )}
            {data &&
                new Date(data.startDateTime).getTime() >
                    new Date().getTime() && (
                    <QuizPageWaiting
                        startDateTime={new Date(data.startDateTime)}
                        week={data.week}
                        name={data.name}
                        quizId={data.quizId}
                    />
                )}
            {/* work out how quiz begins here */}
            {data &&
                !data.ended &&
                new Date(data.startDateTime).getTime() <
                    new Date().getTime() && <LiveQuiz></LiveQuiz>}
        </NavBar>
    );
}

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{
        quizId: string;
    }>
) {
    const session = await getSession(ctx);

    const { params } = ctx;
    const quizId = params?.quizId as string;
    return {
        props: {
            quizId,
            session,
        },
    };
}

export default QuizIndividualPage;
