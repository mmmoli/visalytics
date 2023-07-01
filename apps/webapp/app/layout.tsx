import './global.css';
import { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Visalytics',
  description: 'Tracking Visa applications',
};

export interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
