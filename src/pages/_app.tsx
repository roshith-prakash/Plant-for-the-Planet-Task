import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'animate.css';

// Create a new query client for Tanstack query
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Plant for the Planet</title>
        <link rel="icon" href="plant.png" />
      </Head>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
