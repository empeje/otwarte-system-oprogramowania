import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';

const ROBOTO_TTF = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

const ROBOTO_MONO_TTF = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);

  // Wait for validation to complete before rendering the page and stop the
  // rendering if the hash is invalid. Comment out the following useEffect
  // hook to see the page render without the hash validation.
  useEffect(() => {
    axios
      .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
      .then((response) => setIsHashValid(response.status === 200));
  }, []);

  if (!isHashValid) {
    return null;
  }

  return (
    <main className={`${ROBOTO_TTF.variable} ${ROBOTO_MONO_TTF.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
