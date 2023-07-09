import { FC } from 'react';
import { useTRPC } from '../../hooks/use-trpc/use-trpc';

export const ApplicationList: FC = () => {
  const api = useTRPC();
  const listQuery = api.applications.list.useQuery();
  return <pre>{JSON.stringify(listQuery.data, undefined, 2)}</pre>;
};
