import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@visalytics/ui';
import { FC } from 'react';
import { useApplicationForm } from './use-application-form';
import { format } from 'date-fns';

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
        <FormField
          control={form.control}
          name="submission.date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Submission Date</FormLabel>
              <DatePicker
                label={
                  field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )
                }
                calendarProps={{
                  selected: field.value,
                  mode: 'single',
                  onSelect: field.onChange as (event: Date | undefined) => void,
                  initialFocus: true,
                  disabled: (date) =>
                    date > new Date() || date < new Date('2000-01-01'),
                }}
              />
              <FormDescription>
                Helps Visalytics understand how long you had to wait.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="travelDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Travel Date</FormLabel>
              <DatePicker
                label={
                  field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )
                }
                calendarProps={{
                  selected: field.value,
                  mode: 'single',
                  onSelect: field.onChange as (event: Date | undefined) => void,
                  initialFocus: true,
                  disabled: (date) =>
                    date > new Date() || date < new Date('2000-01-01'),
                }}
              />
              <FormDescription>
                Helps Visalytics understand how long you anticipated you had to
                wait
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
