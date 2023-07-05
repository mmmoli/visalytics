import type { NextPage } from 'next';
import { api } from '../utils/api';
import { useCallback } from 'react';

const IndexPage: NextPage = () => {
  const { data: message } = api.example.sayHi.useQuery({
    name: 'John',
  });

  const { data: people } = api.example.people.useQuery();
  const { mutate: joinCommand } = api.example.join.useMutation();

  const onClickHandler = useCallback(() => {
    joinCommand({
      name: 'John',
    });
  }, [joinCommand]);

  return (
    <div>
      <h1>Message</h1>
      <pre>{JSON.stringify(message)}</pre>
      <h2>People</h2>
      <pre>{JSON.stringify(people)}</pre>
      <button onClick={onClickHandler}>Join</button>
    </div>
  );
};

export default IndexPage;
