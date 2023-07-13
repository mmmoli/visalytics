import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@visalytics/modules/accounts/web';
import Link from 'next/link';

import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav>
      <ul className="flex space-x-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/applications">Applications</Link>
        </li>
        <li>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Sign In</Link>
          </SignedOut>
        </li>
      </ul>
    </nav>
  );
};
