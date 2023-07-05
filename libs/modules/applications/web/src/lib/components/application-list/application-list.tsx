import { FC } from 'react';
import { useApi } from '../../hooks/use-api';

export const ApplicationList: FC = () => {
  const api = useApi();
  const { data } = api.applications.listApplications.useQuery();
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
