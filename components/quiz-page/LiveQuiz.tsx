import { useRouter } from "next/router";
import { QuestionData } from "../../types/quizTypes";
import useSWR from "swr";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import QuizTimer from "./QuizTimer";
import { MouseEvent } from "react";
import LogoGreen from "../svg/LogoGreen";

interface MyError extends Error {
    info: { message: string };
    status: number;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error() as MyError;
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
};
function LiveQuiz() {
    const router = useRouter();
    const wallet = useWallet();
    const { quizId } = router.query;

    const { data, error, isLoading } = useSWR<QuestionData[], MyError>(
        // `/api/question?quizId=${quizId}&questionId=${questionId}&user=${wallet.publicKey}`,
        `/api/question?quizId=${quizId}`,
        fetcher
    );
    const [selected, setSelected] = useState(0);
    const [effect, setEffect] = useState(false);

    let disableButton = false;
    if (selected) {
        disableButton = true;
    }
    if (error)
        return (
            <div className="w-full md:w-[70%] mx-auto px-6 md:px-10 ">
                <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white ">
                    <div className="grid place-items-center">
                        <h3 className="text-3xl md:text-5xl text-[#C5FB00] font-bold ">
                            Error
                        </h3>

                        <h3 className=" text-center text-3xl md:text-5xl text-white font-bold mt-8">
                            {error.info && error.info.message}
                        </h3>
                    </div>
                </div>
            </div>
        );
    if (isLoading) return <div>loading...</div>;
    const questionData: QuestionData = data ? data[0] : null;

    const chooseOption = (
        e: MouseEvent<HTMLButtonElement>,
        optionId: number
    ) => {
        setSelected(optionId);
        // send post request for selection and return correct or wrong
        // then redirect to show correct or wrong and then next question
        // const response = fetch(...);
        // setCorrect(response);
    };

    // write a function to redirect once timer hits 0, pass it down to QuizTimer.
    // I need to get whether the ans is correct, how many points, and the ranking in the quiz

    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            <div className="absolute border-4 rounded-full w-16 h-16 grid place-items-center">
                <QuizTimer seconds={questionData!.timelimit} />
            </div>
            <div className="grid place-items-center">
                <p className="text-3xl font-bold">
                    Question {questionData?.questionId}
                </p>
                <br />
                <p className="text-3xl font-bold">{questionData?.text}</p>
                {questionData?.image !== null ? (
                    <img
                        src={questionData?.image}
                        className="object-cover h-72 w-96"
                    ></img>
                ) : (
                    <div className="h-64 w-80 grid place-items-center">
                        <div className="animate-pulse ">
                            <LogoGreen
                                className="animate-bounce"
                                width={100}
                                height={100}
                                view={"230 230 400 400"}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center flex-wrap box ">
                <div className="grid grid-cols-2 grid-rows-2 p-1">
                    {questionData?.option.map((option) => {
                        return (
                            <button
                                key={option.optionId}
                                disabled={disableButton}
                                className={`${effect && "animate-spin"}`}
                                onClick={(e) =>
                                    chooseOption(e, option!.optionId)
                                }
                            >
                                <div
                                    className={
                                        selected === option?.optionId
                                            ? "text-white grid p-16 border rounded-xl m-2 text-xl font-bold place-items-center bg-[#A5DB00]"
                                            : selected
                                            ? "text-white grid p-16 border rounded-xl m-2 text-xl font-bold place-items-center"
                                            : "text-white grid p-16 border rounded-xl m-2 text-xl font-bold place-items-center hover:bg-[#A5DB00] hover:scale-105 hover:text-black"
                                    }
                                >
                                    <p className="text-inherit">
                                        {option?.text}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <br />
            {selected ? (
                <p className="grid place-items-center text-xl font-bold animate-bounce">
                    Speed Demon?
                </p>
            ) : (
                ""
            )}
        </div>
    );
}

export default LiveQuiz;
