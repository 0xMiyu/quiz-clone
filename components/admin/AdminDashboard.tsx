import useSWR from "swr";
import Link from "next/link";
import { QuestionAdminData } from "../../types/quizTypes";
import { ErrorMessage } from "../../types/errorMessage";
import { getSession } from "next-auth/react";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error();
        // Attach extra info to the error object.
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        throw error;
    }

    return res.json();
};

function AdminDashboard() {
    const { data, error, isLoading } = useSWR<QuestionAdminData, ErrorMessage>(
        `/api/admin`,
        fetcher
    );
    // either not logged in or not authorised as error

    if (error)
        return (
            <div className="w-full md:w-[70%] mx-auto px-6 md:px-10 ">
                <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white ">
                    <div className="grid place-items-center">
                        <h3 className="text-3xl md:text-5xl text-[#C5FB00] font-bold ">
                            Error
                        </h3>

                        <h3 className=" text-center text-3xl md:text-5xl text-white font-bold mt-8">
                            {error.message}
                        </h3>
                    </div>
                </div>
            </div>
        );
    // for the actual quiz will need to have react query maybe? need save state.
    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            <div className="text-center relative py-10 mt-28 bg-[#212121] rounded-xl w-full">
                <img
                    className="absolute m-auto left-0 right-0 h-32 w-32 md:h-48 md:w-48 mx-auto z-10 -top-16 md:-top-28 bg-white rounded-3xl"
                    src={data?.image}
                ></img>

                <h3 className="text-[#C5FB00] mt-16 text-2xl md:text-4xl font-bold">
                    Welcome {data?.name}
                </h3>
            </div>
            {/* low priority, get to it later */}
            <p className="p-2 text-[#e5e5e5]">Filter</p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {data?.quizzes.map((quiz: any) => {
                    return (
                        <Link
                            href={`/details/${quiz?.quizId}`}
                            key={quiz?.quizId}
                        >
                            <div className="bg-[#0E0E0E] border-2 rounded-lg h-48">
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-[#C5FB00] mb-2 truncate">
                                        {quiz?.name}
                                    </h2>
                                    <p className="truncate">
                                        Week: {quiz?.week}
                                    </p>
                                    <p className=" truncate">
                                        Start Time:
                                        <br />
                                        {quiz &&
                                            new Date(
                                                quiz?.startDateTime
                                            ).toLocaleString()}
                                    </p>
                                    <div className="border-t-2 border-[#9C9C9C] my-2"></div>
                                    <p className="grid place-items-center text-[#C5FB00]">
                                        {quiz?.ended ? "Ended" : "Ongoing"}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminDashboard;
