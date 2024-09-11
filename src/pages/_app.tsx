import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import 'animate.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Plant for the Planet</title>
        <link rel="icon" href="plant.png" />
      </Head>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
