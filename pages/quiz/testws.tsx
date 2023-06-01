// import type { NextPage } from "next";
// import { useEffect, useState } from "react";
// import { Socket, io } from "socket.io-client";
// import Timer from "../../components/quiz-page/Timer";

// const socket: Socket = io("http://localhost:3001");

// const Testws: NextPage = () => {
//     const [input, setInput] = useState<string>("");

//     useEffect(() => {
//         socket.on("connect", () => {
//             console.log("Connected to the server.");
//         });

//         socket.on("disconnect", () => {
//             console.log("Disconnected from the server.");
//         });

//         socket.on("quizFound", (quiz) => {
//             console.log("Quiz found:", quiz);
//         });

//         socket.on("quizNotFound", (error) => {
//             console.log("Quiz not found:", error);
//         });

//         socket.on("update-input", (msg) => {
//             setInput(msg);
//         });
//     }, []);

//     const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInput(e.target.value);
//         socket.emit("input-change", e.target.value);
//     };

//     return (
//         <>
//             {/* <Timer startdatetime={new Date('2023-05-14 11:00:00')} /> */}
//             <input
//                 placeholder="Type something"
//                 value={input}
//                 onChange={onChangeHandler}
//             />
//         </>
//     );
// };

// export default Testws;
