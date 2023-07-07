import { FC } from 'react';
import { useIndexPage } from './use-index-page';
import { Button } from '@visalytics/ui';

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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Message
      </h1>
      <pre>{JSON.stringify(messageQuery.data)}</pre>
      <h2>People</h2>
      <pre>
        {JSON.stringify(peopleQuery.data)}
        {peopleQuery.isRefetching ? <span>…</span> : null}
      </pre>
      <Button disabled={joinMutation.isLoading} onClick={joinCommandHandler}>
        Join
      </Button>
      <Button
        disabled={createApplicationMutation.isLoading}
        onClick={createApplicationHandler}
      >
        Create Application
      </Button>
    </div>
  );
};
