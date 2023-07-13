import type { AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { api } from '../utils/api';
import { Navbar } from '../components';
import { AccountsProvider } from '@visalytics/modules/accounts/web';

import '../styles/globals.css';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <AccountsProvider {...pageProps}>
      <main className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </AccountsProvider>
  );
};

export default api.withTRPC(MyApp);
