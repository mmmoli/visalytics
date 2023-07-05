import { API } from '@visalytics/shared-services/trpc';
import { atom, useAtomValue } from 'jotai';

export const apiAtom = atom<API | null>(null);

export const useApi = () => {
  const api = useAtomValue(apiAtom);
  if (!api) {
    throw new Error('No API found');
  }
  return api;
};
