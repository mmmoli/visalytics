import { FC } from 'react';
import { ApplicationForm } from '@visalytics/modules/applications/web';

export const ApplicationFormPageView: FC = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Application Entry
      </h1>
      <ApplicationForm />
    </div>
  );
};
