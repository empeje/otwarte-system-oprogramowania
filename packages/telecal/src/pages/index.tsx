import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import GithubSvg from '../assets/GithubSvg';
import useTelegramInitData from '../hooks/useTelegramInitData';
const DynamicMainButton = dynamic(
  () => import('@twa-dev/sdk/dist/react').then((module) => module.MainButton),
  { ssr: false }
);

const Home: NextPage = () => {
  const initData = useTelegramInitData();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telegram-white">
      <Head>
        <title>Telecal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <span className="text-2xl font-bold text-telegram-black">
          Welcome {initData.user?.username}
        </span>
        <p className="text-telegram-black">
          This menu is still not available. Please contact the <a className="text-blue-500" href="https://t.me/empeje">author</a> 😿!</p>
      </main>

      <footer className="flex h-20 w-full items-center justify-center border-t border-t-telegram-black text-telegram-black">
        <p>Made with love by empeje</p>
      </footer>
    </div>
  );
};

export default Home;
