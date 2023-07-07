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
      fee: {
        currency: 'USD',
        value: 23.34,
      },
      fromNationCode: 'GBR',
      toNationCode: 'ITA',
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
