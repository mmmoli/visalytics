import type { NextPage } from 'next';
import { useIndexPage } from '../view-models';

const IndexPage: NextPage = () => {
  const { message, onClickHandler, people } = useIndexPage();
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
