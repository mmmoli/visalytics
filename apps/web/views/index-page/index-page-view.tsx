import { FC } from 'react';
import { useIndexPage } from './use-index-page';

export const IndexPageView: FC = () => {
  const { messageQuery, onClickHandler, peopleQuery } = useIndexPage();
  return (
    <div>
      <h1>Message</h1>
      <pre>
        {messageQuery.isLoading ? <span>…</span> : null}
        {JSON.stringify(messageQuery.data)}
      </pre>
      <h2>People</h2>
      <pre>
        {peopleQuery.isLoading ? <span>…</span> : null}
        {JSON.stringify(peopleQuery.data)}
      </pre>
      <button onClick={onClickHandler}>Join</button>
    </div>
  );
};
