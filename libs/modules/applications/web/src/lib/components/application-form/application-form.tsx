import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@visalytics/ui';
import { FC } from 'react';
import { useApplicationForm } from './use-application-form';

export const ApplicationForm: FC = () => {
  const { form, submitHandler, availableNations } = useApplicationForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="fromNationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <Select
                onValueChange={field.onChange as (value: string) => void}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableNations.map((nation) => (
                    <SelectItem value={nation.code} key={nation.code}>
                      {nation.flag} {nation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Your nationality.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
