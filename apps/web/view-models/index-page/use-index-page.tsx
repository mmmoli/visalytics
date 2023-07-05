import { useCallback } from 'react';
import { api } from '../../utils/api';

export const useIndexPage = () => {
  const utils = api.useContext();
  const { data: message } = api.example.sayHi.useQuery({
    name: 'John',
  });

  const { data: people } = api.example.people.useQuery();
  const { mutate: joinCommand } = api.example.join.useMutation({
    onSuccess: () => {
      utils.example.people.invalidate();
    },
  });

  const onClickHandler = useCallback(() => {
    joinCommand({
      name: 'John',
    });
  }, [joinCommand]);

  return {
    message,
    people,
    onClickHandler,
  };
};
