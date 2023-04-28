// Base Imports
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Component Imports
import Loader from "@components/utils/Loader/loader";

// Other Imports
import { APP_ROUTES } from "@utils/constants";

export const RouteGuard = ({ auth, children }) => {
  const router = useRouter();
  const { user, token } = auth;

  const isNotLoading = /*user*/ token && !isValidationLoading;

  const isAuthenticated = () => {
    return !!token;
    //return !!user?.isValid;
  };

  const redirectToLogin = () => {
    router.push(APP_ROUTES.LOGIN);
  };

  useEffect(() => {
    const publicPaths = [APP_ROUTES.SSO_MIDDLEWARE];
    const path = router.asPath.split("?")[0];

    // redirect to login if token is missing
    if (!token) {
      redirectToLogin();
      return;
    }

    // redirect to login page if accessing a private page and not logged in
    if (isNotLoading && !isAuthenticated() && !publicPaths.includes(path)) {
      redirectToLogin();
      return;
    }
    // redirect to home if accessing a the login page and logged in
    if (isNotLoading && isAuthenticated() && publicPaths.includes(path)) {
      router.push(APP_ROUTES.HOME);
      return;
    }
  }, [isNotLoading]);

  return (
    <>
      {isValidationLoading || !isAuthenticated() ? <Loader></Loader> : children}
    </>
  );
};

RouteGuard.displayName = 'RouteGuard';