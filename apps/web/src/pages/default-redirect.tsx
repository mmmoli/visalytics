import type { GetStaticProps, NextPage } from 'next';

const DefaultRedirectPage: NextPage = () => {
  return <div>Redirecting…</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default DefaultRedirectPage;
