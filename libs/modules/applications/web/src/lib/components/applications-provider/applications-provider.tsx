import { API } from '@visalytics/shared-services/trpc';
import { Provider as JotaiProvider, Atom } from 'jotai';
import { FC, ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
  apiAtom: Atom<API>;
}

export const ApplicationsProvider: FC<ProviderProps> = ({
  children,
  apiAtom,
}) => {
  debugger;
  return <JotaiProvider>{children}</JotaiProvider>;
};
