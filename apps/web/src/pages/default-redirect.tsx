import type { GetServerSideProps, NextPage } from 'next';

const DefaultRedirectPage: NextPage = () => {
  return <div>Redirecting…</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default DefaultRedirectPage;
