import { FC } from 'react';
import { useIndexPage } from './use-index-page';

export const IndexPageView: FC = () => {
  const {
    createApplicationHandler,
    joinCommandHandler,
    messageQuery,
    peopleQuery,
    createApplicationMutation,
    joinMutation,
  } = useIndexPage();

  return (
    <div>
      <h1>Message</h1>
      <pre>{JSON.stringify(messageQuery.data)}</pre>
      <h2>People</h2>
      <pre>
        {JSON.stringify(peopleQuery.data)}
        {peopleQuery.isRefetching ? <span>…</span> : null}
      </pre>
      <button disabled={joinMutation.isLoading} onClick={joinCommandHandler}>
        Join
      </button>
      <button
        disabled={createApplicationMutation.isLoading}
        onClick={createApplicationHandler}
      >
        Create Application
      </button>
    </div>
  );
};
