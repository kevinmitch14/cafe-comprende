import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
