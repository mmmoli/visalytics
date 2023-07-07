import '../styles/globals.css';
import type { AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { api } from '../utils/api';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
