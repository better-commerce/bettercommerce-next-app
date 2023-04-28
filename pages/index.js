import AuthenticatedRoute from '@components/authentication-route';
import { NextSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import { AUTH_CURRENT_MODULE } from '@utils/constants';
import Link from 'next/link';

const Home = () => {
  const { navTree } = useSelector((state) => state.auth);
  const menuLinks = navTree?.navTree?.items?.find(
    (x) => x.menu === AUTH_CURRENT_MODULE
  );
  const menuLinksExist = menuLinks?.items?.length > 0;

  return (
    <>
      <div className="w-full px-10 sm:px-20 md:px-32">
        <NextSeo title="better-next-app" titleTemplate="%s - BetterCommerce"></NextSeo>
        {!menuLinksExist ? (
          <div>
            You do not have access to App. Please contact administrator.
          </div>
        ) : (
          <>
            <h1>better-next-app</h1>
          </>
        )}
      </div>
    </>
  );
};

export default AuthenticatedRoute(Home);
