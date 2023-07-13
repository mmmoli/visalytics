import { api } from '../../utils/api';

export const useApplicationListPage = () => {
  const applicationListQuery = api.applications.list.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 2,
  });

  return {
    applicationListQuery,
  };
};
