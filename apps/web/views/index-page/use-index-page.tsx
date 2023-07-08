import { useCallback } from 'react';
import { api } from '../../utils/api';

export const useIndexPage = () => {
  const utils = api.useContext();
  const messageQuery = api.example.sayHi.useQuery({
    name: 'John',
  });

  const peopleQuery = api.example.people.useQuery();

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
      fromNationCode: 'GBR',
      toNationCode: 'ITA',
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
