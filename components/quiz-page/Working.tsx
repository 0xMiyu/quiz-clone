import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction } from "@solana/web3.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
    MakeTransactionInputData,
    MakeTransactionOutputData,
} from "../../pages/api/makeTransaction";
import { FindReferenceError, findReference } from "@solana/pay";

interface WorkingProps {
    triviaId: number;
    enterQuiz: Function;
    setIsLoading: Function;
    setIsVisible: Function;
}

function Working(props: WorkingProps) {
    const router = useRouter();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [isFinding, setIsFinding] = useState(false);
    const [clickEnter, setClickEnter] = useState(false);

    // State to hold API response fields
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // Generate the unique reference which will be used for this transaction
    const reference = useMemo(() => Keypair.generate().publicKey, []);

    // Use our API to fetch the transaction for the selected items
    async function getTransaction() {
        if (!publicKey) {
            return;
        }

        const body: MakeTransactionInputData = {
            account: publicKey.toString(),
        };

        const response = await fetch(
            `/api/makeTransaction?triviaid=${
                props.triviaId
            }&reference=${reference.toString()}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const json = (await response.json()) as MakeTransactionOutputData;

        if (response.status !== 200) {
            console.error(json);
            return;
        }

        // Deserialize the transaction from the response
        const transaction = Transaction.from(
            Buffer.from(json.transaction, "base64")
        );
        setTransaction(transaction);
        setMessage(json.message);
        console.log(transaction);
    }

    function enterQuiz() {
        setClickEnter(true);
        getTransaction();
    }

    // Send the fetched transaction to the connected wallet
    async function trySendTransaction() {
        if (!transaction) {
            return;
        }
        try {
            props.setIsLoading(true);
            setIsFinding(true);
            await sendTransaction(transaction, connection);
        } catch (e) {
            console.error(e);
        }
    }

    // Send the transaction once it's fetched
    useEffect(() => {
        trySendTransaction();
    }, [transaction]);

    // Check every 0.5s if the transaction is completed
    useEffect(() => {
        let interval: NodeJS.Timer;
        if (clickEnter) {
            interval = setInterval(async () => {
                console.log("trying");
                try {
                    // Check if there is any transaction for the reference
                    const signatureInfo = await findReference(
                        connection,
                        reference
                    );
                    console.log("They paid!!!");
                    // ADD post request to create quizentry
                    props.enterQuiz();
                    props.setIsLoading(false);
                    setIsFinding(false);
                    props.setIsVisible(true);
                    setClickEnter(false);
                } catch (e) {
                    if (e instanceof FindReferenceError) {
                        // No transaction found yet, ignore this error
                        return;
                    }
                    console.error("Unknown error", e);
                }
            }, 500);
        }
        return () => {
            clearInterval(interval);
        };
    }, [clickEnter]);

    let connected = false;
    if (publicKey) {
        connected = true;
    }
    console.log(publicKey);
    console.log(connected);

    return (
        <div>
            <h2 className="text-2xl md:text-3xl text-white font-bold">
                How the quiz works?
            </h2>

            <p className="text-base md:text-lg my-4">
                When you enter the Quiz our platform connects you to your
                Discord account to provide you with a unique and exciting trivia
                experience. Our Discord bot allows you to join live quizzes and
                compete with other players and the winner, you guessed it-takes
                all the money in the pot! With the pot tracker, you&apos;ll
                always know how much is up for grabs. So what are you waiting
                for? Don&apos;t miss out on the trivia revolution!
            </p>
            {!isFinding && (
                <div className="flex">
                    <button
                        className="connect-wallet w-full md:w-[14rem]"
                        onClick={enterQuiz}
                        disabled={!connected}
                    >
                        Enter the quiz
                    </button>
                    {!connected && (
                        <p className="m-2 text-[#dbaaaa]">
                            Connect Your Wallet To Enter!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Working;
