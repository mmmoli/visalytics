import { FC } from 'react';
import { useIndexPage } from './use-index-page';
import { Button } from '@visalytics/ui';

export const IndexPageView: FC = () => {
  const { createApplicationHandler, createApplicationMutation } =
    useIndexPage();

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Message
      </h1>
      <Button
        disabled={createApplicationMutation.isLoading}
        onClick={createApplicationHandler}
      >
        Create Application
      </Button>
    </div>
  );
};
