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
      </ul>
    </nav>
  );
};
