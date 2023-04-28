// Base Imports
import React, { memo, useEffect } from "react";

// Package Imports
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Component Imports
import Layout from "@components/common/Layout";
import { ManagedUIContext } from '@context/ui';
import '@styles/index.css'
import 'tailwindcss/tailwind.css'
import '@styles/globals.css'
import { store, useTypedDispatch, wrapper } from "redux/store";
import "@styles/icons.css";
import { API_TOKEN, APP_ROUTES, AUTH_COOKIE_VALIDATION_ENABLED, AUTH_TOKEN, COOKIE_CHECK_AUTH_COOKIE, COOKIE_SOID, COOKIE_SUID, ENABLE_ALERT_LOG, LOGOUT_LINK_SELECTOR } from "@utils/constants";
import { decodeToken, isValidToken } from "@utils/token-util";
import { resetUser } from "redux/auth";
import { getLoginUrl, getLogoutUrl } from "@utils/app-util";
import { stringToBoolean } from "@utils/parse-util";

const MyApp = memo(({ Component, pageProps }) => {
  const { tokenOrgId } = pageProps;
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const auth = useSelector((state) => state.auth);
  const isValidSession = isValidToken(auth?.token);
  //const state = store().getState();
  //const auth = state?.auth;
  const isDevelopmentEnv = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  const considerLoggedOutRedirect = !(Component.name === "SSOPage" || Component.name === "LoginPage" || Component.name === "LoginErrorPage");
  const isNonLayoutPage = (Component.name === "SSOPage" || Component.name === "LoginPage" || Component.name === "LoginErrorPage");

  const cmpComponent = (
    <Component {...pageProps} />
  );


  const appLayout = (
    <>
      <Layout auth={auth} orgId={auth.user?.tokenInfo?.orgId} domains={auth.user?.tokenInfo?.domains} userId={auth.user?.tokenInfo?.userId}>
        {cmpComponent}
      </Layout>
    </>
  );

  let vercelProdHandlingIsLoginPage = false;
  let vercelProdHandlingIsAccountSSO = false;
  if (typeof alert !== 'undefined') {

    if (typeof window !== 'undefined') {
      vercelProdHandlingIsLoginPage = (window.location.pathname.toLowerCase() == APP_ROUTES.LOGIN.toLowerCase());
      vercelProdHandlingIsAccountSSO = (window.location.pathname.toLowerCase() == APP_ROUTES.SSO_MIDDLEWARE.toLowerCase());
    }
  }

  useEffect(() => {
    if (auth?.token == null && considerLoggedOutRedirect && !vercelProdHandlingIsAccountSSO) {
      showAlert(1);
      router.push(APP_ROUTES.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (!isValidSession && considerLoggedOutRedirect && !vercelProdHandlingIsAccountSSO) {
      showAlert(2);
      router.push(APP_ROUTES.LOGIN);
    }
  }, [isValidSession]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {

      if (!isDevelopmentEnv || stringToBoolean(AUTH_COOKIE_VALIDATION_ENABLED)) {
        const checkAuthFlagCookie = Cookies.get(COOKIE_CHECK_AUTH_COOKIE);
        showAlert(`checkAuthFlagCookie: ${checkAuthFlagCookie}`);
        const suidCookie = Cookies.get(COOKIE_SUID);
        const soidCookie = Cookies.get(COOKIE_SOID);
        showAlert(`suid: ${suidCookie}, soid: ${soidCookie}`);

        /*let orgMismatch = false;
        const tokenValue = decodeToken(auth?.token);
        if (tokenValue) {
          const tokenOrgId = tokenValue.OrgId;
          if (soidCookie && tokenOrgId) {
            orgMismatch = (soidCookie.toLowerCase() !== tokenOrgId.toLowerCase());
          }
        }*/

        if (!checkAuthFlagCookie && (!suidCookie || !soidCookie /*|| orgMismatch*/)) {
          showAlert(3);

          // Create temp cookie - "auth cookie".
          Cookies.set(COOKIE_CHECK_AUTH_COOKIE, true);

          let redirectUrl = APP_ROUTES.LOGIN;
          /*if (orgMismatch) {
            const domainIdCookie = Cookies.get(soidCookie);
            redirectUrl = getLoginUrl(soidCookie, domainIdCookie);
          }*/

          // Redirect to login for auth.
          router.replace(redirectUrl);
        }
      }
    });

    return () => {
      router.events.off("routeChangeStart", () => {
      });
    };
  }, [router.events]);

  return (
    (isNonLayoutPage || vercelProdHandlingIsLoginPage || vercelProdHandlingIsAccountSSO) ? (
      cmpComponent
    ) : (
      !auth?.token ? (
        <></>
      ) : (
        <ManagedUIContext>
          {appLayout}
        </ManagedUIContext>
      )
    )
  );
});

MyApp.getInitialProps = wrapper.getInitialPageProps(store => ({ pathname, req, res }) => {
  //let isValidSession = true;
  let tokenOrgId = "";
  const { auth } = store.getState();
  const { token } = auth;

  if (token) {
    //isValidSession = isValidToken(token);
    const tokenValue = decodeToken(token);
    if (tokenValue) {
      tokenOrgId = tokenValue.OrgId;
    }
  } /*else {
    isValidSession = false;
  }*/

  return {
    pageProps: {
      //isValidSession: isValidSession,
      tokenOrgId: tokenOrgId
    }
  };
});

export const showAlert = (value) => {
  if (ENABLE_ALERT_LOG) {
    alert(value);
  }
};
MyApp.displayName = 'MyApp';

export default wrapper.withRedux(MyApp);
