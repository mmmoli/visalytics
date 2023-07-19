import { useForm } from 'react-hook-form';
import { ApplicationFormValues } from './application-form-schema';
import { useTRPC } from '../../hooks/use-trpc/use-trpc';
import { useCallback } from 'react';

export const useApplicationForm = () => {
  const api = useTRPC();

  const createApplicationMutation =
    api.applications.createApplication.useMutation();

  const form = useForm<ApplicationFormValues>({
    defaultValues: {
      fromNationCode: 'GB',
      toNationCode: 'US',
      travelDate: new Date(2022, 5, 2),
      submission: {
        fee: {
          amount: 23.45,
          currency: 'GBP',
        },
        // date: new Date(2019, 4, 4),
      },
      decision: {
        outcome: 'GRANTED',
        durationInDays: 34,
        receivedOn: new Date(2019, 5, 4),
      },
    },
  });

  const { data: availableNations } = api.applications.availableNations.useQuery(
    undefined,
    {
      initialData: [],
    }
  );

  const submitHandler = useCallback(
    (values: ApplicationFormValues) => createApplicationMutation.mutate(values),
    [createApplicationMutation]
  );

  return { form, submitHandler, availableNations };
};
