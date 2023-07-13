import { ClerkProvider } from '@clerk/nextjs';
import { FC, ReactNode } from 'react';
import { env } from '../../../env';

export interface AccountsProviderProps {
  children: ReactNode;
}

export const AccountsProvider: FC<AccountsProviderProps> = ({
  children,
  ...props
}) => (
  <ClerkProvider
    {...props}
    publishableKey={env.NX_PUBLIC_CLERK_PUBLISHABLE_KEY}
    afterSignInUrl={env.NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
    afterSignUpUrl={env.NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
    signInUrl={env.NX_PUBLIC_CLERK_SIGN_IN_URL}
    signUpUrl={env.NX_PUBLIC_CLERK_SIGN_UP_URL}
  >
    {children}
  </ClerkProvider>
);
