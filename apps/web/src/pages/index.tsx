import type { NextPage } from 'next';
import { HomePageView } from '../views/home-page/';
import { IndexPageView } from '../views/index-page';
import { SignedIn, SignedOut } from '@visalytics/modules/accounts/web';

const HomePage: NextPage = () => {
  return (
    <>
      <SignedIn>
        <IndexPageView />
      </SignedIn>
      <SignedOut>
        <HomePageView />;
      </SignedOut>
    </>
  );
};

export default HomePage;
