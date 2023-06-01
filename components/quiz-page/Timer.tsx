import { useEffect, useState } from "react";
import { calculateTimeDifference } from "../../utils/timeUtils";
import io, { Socket } from "socket.io-client";

interface TimerProps {
    startDateTime: Date;
}

export default function Timer(props: TimerProps) {
    const result = calculateTimeDifference(
        Date.now(),
        props.startDateTime.getTime(),
        true
    );
    const [timeLeft, setTimeLeft] = useState<string>(result.value);

    const updateTime = () => {
        const result = calculateTimeDifference(
            Date.now(),
            props.startDateTime.getTime(),
            true
        );
        setTimeLeft(result.value);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        intervalId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <div className="flex justify-between items-center mt-6 mb-16">
            {/* days */}
            <div className="bg-transparent border  rounded-3xl items-center p-2 md:p-4 flex flex-col justify-center h-[6rem] md:h-[12rem] w-[100%]">
                <p className="text-white text-center font-bold text-3xl md:text-6xl">
                    Countdown
                </p>
                <p className="text-white text-center font-extrabold text-2xl md:text-5xl">
                    {timeLeft}
                </p>
            </div>
        </div>
    );
}
