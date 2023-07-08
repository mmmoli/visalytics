import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@visalytics/shared-services/trpc';
import { useHydrateAtoms } from 'jotai/utils';
import { FC } from 'react';
import { atom } from 'jotai'

export type API = typeof createTRPCNext<AppRouter>

export interface HydrateAtomsProps {
  api: API;
}

const apiAtom = atom<API | undefined>(undefined)

export const HydrateAtoms: FC<HydrateAtomsProps> = ({ api }) => {
  useHydrateAtoms([[apiAtom, api]]);
  return null;
};
