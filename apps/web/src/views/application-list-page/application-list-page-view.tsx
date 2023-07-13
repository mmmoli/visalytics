import { FC } from 'react';
import { useApplicationListPage } from './use-application-list-page';

export const ApplicationListPageView: FC = () => {
  const { applicationListQuery } = useApplicationListPage();

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Applications
      </h1>
      <pre>{JSON.stringify(applicationListQuery.data, undefined, 2)}</pre>
    </div>
  );
};
