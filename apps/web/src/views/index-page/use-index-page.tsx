import { useCallback } from 'react';
import { api } from '../../utils/api';

export const useIndexPage = () => {
  const createApplicationMutation =
    api.applications.createApplication.useMutation();

  const createApplicationHandler = useCallback(() => {
    createApplicationMutation.mutate({
      fromNationCode: 'GB',
      toNationCode: 'IT',
      travelDate: new Date(2022, 5, 2),
      submission: {
        fee: {
          amount: 23.45,
          currency: 'GBP',
        },
        date: new Date(2019, 4, 4),
      },
      decision: {
        outcome: 'GRANTED',
        durationInDays: 34,
        receivedOn: new Date(2019, 5, 4),
      },
    });
  }, [createApplicationMutation]);

  return {
    createApplicationMutation,
    createApplicationHandler,
  };
};
