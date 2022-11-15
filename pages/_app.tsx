import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Analytics />
    </QueryClientProvider>
  );
}

export default MyApp;
