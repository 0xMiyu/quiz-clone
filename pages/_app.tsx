import Head from "next/head";

import { SessionProvider } from "next-auth/react";
import React, { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import type { AppProps } from "next/app";

require("@solana/wallet-adapter-react-ui/styles.css");
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <SessionProvider
                        session={pageProps.session}
                        refetchInterval={0}
                    >
                        <Head>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1"
                            />
                            <link rel="icon" href="/favicon.png"></link>
                        </Head>
                        <Component {...pageProps} />
                    </SessionProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
