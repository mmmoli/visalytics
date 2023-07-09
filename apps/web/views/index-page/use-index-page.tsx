import { useCallback } from 'react';
import { api } from '../../utils/api';

export const useIndexPage = () => {
  const utils = api.useContext();
  const messageQuery = api.example.sayHi.useQuery(
    {
      name: 'John',
    },
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  const peopleQuery = api.example.people.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 2,
  });

  const joinMutation = api.example.join.useMutation({
    onSuccess: () => {
      utils.example.people.invalidate();
    },
  });

  const createApplicationMutation =
    api.applications.createApplication.useMutation();

  const joinCommandHandler = useCallback(() => {
    joinMutation.mutate({
      name: 'John',
    });
  }, [joinMutation]);

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
    messageQuery,
    peopleQuery,
    createApplicationMutation,
    joinMutation,
    joinCommandHandler,
    createApplicationHandler,
  };
};
