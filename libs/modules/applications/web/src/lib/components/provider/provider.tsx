import { FC, PropsWithChildren } from 'react';
import { API, HydrateAtoms } from './hydrate-atoms';
import { Provider as JotaiProvider } from 'jotai';

export type ProviderProps = PropsWithChildren & {
  api: API;
};

export const Provider: FC<ProviderProps> = ({ children, api }) => {
  return (
    <JotaiProvider>
      <HydrateAtoms api={api} />
      {children}
    </JotaiProvider>
  );
};
