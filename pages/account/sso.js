// Base Imports
import React, { useEffect, useState } from "react";

// Package Imports
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Component Imports
import Loader from "@components/utils/Loader/loader";

// Service Imports
import { useNavTreeMutation, useValidateTokenMutation } from "services/auth";

// Other Imports
import { setNavTree, setTokens } from "redux/auth";
import { useTypedDispatch } from "redux/store";
import { uriParams } from "@utils/uri-util";
import { APP_ROUTES, Auth, AuthMessage, AUTH_BASE_URL, COOKIE_CHECK_AUTH_COOKIE, COOKIE_SOID, FETCHING_DATA, UNPACKING_PAYLOAD, VALIDATING_PAYLOAD } from "../../utils/constants";
import { showAlert } from "../_app";

const SSOPage = ({ query, token }) => {
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const authState = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [stateSaved, setStateSaved] = useState(false);
    const [getNavTree] = useNavTreeMutation();
    const [validateToken] = useValidateTokenMutation();
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        let authToken = null;
        let apiToken = null;

        if (token) {
            setMessage(UNPACKING_PAYLOAD);
            const tokenParams = uriParams(decodeURIComponent(token));
            showAlert("1." + JSON.stringify(tokenParams));
            if (tokenParams) {
                authToken = tokenParams.token;
                showAlert("2." + authToken);
                apiToken = tokenParams.apitoken;
                showAlert("3." + apiToken);

                if (Cookies.get(COOKIE_CHECK_AUTH_COOKIE)) {
                    Cookies.remove(COOKIE_CHECK_AUTH_COOKIE);
                }

                if (authToken && apiToken) {
                    setMessage(VALIDATING_PAYLOAD);
                    dispatch(setTokens({ apiToken: apiToken, authToken: authToken }));

                    validateToken({
                        payload: apiToken,
                        onSuccessFn: (tokenData) => {
                            showAlert("4." + JSON.stringify(tokenData));
                            const userId = tokenData?.tokenInfo?.userId;
                            showAlert("5." + userId);
                            const orgId = tokenData?.tokenInfo?.orgId;
                            showAlert("6." + orgId);
                            //Cookies.set(COOKIE_SOID, orgId);

                            setMessage(FETCHING_DATA);

                            getNavTree({
                                payload: { userId: userId, token: apiToken },
                                onSuccessFn: (data) => {
                                    showAlert("7." + JSON.stringify(data));
                                    setStateSaved(true);
                                },
                                onErrorFn: () => {
                                }
                            });
                        },
                        onErrorFn: () => {
                        }
                    });

                }
            }
        }
    }, [token]);

    useEffect(() => {
        showAlert("8." + JSON.stringify(authState));
        if (stateSaved && authState?.token && authState?.authToken) {
            setTimeout(() => {
                //api.defaults.headers.Authorization = `Bearer ${authState?.token}`;
                router.push(APP_ROUTES.HOME);
            }, 1000);
        }
    }, [/*authState,*/ stateSaved]);

    return (
        <>
            {
                isLoading && (
                    <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
                        {/*<div className="flex items-center"></div>*/}
                        <div className="flex h-screen">
                            <div className="m-auto">
                                <Loader />
                                {
                                    message && (
                                        <div className="flex items-center">
                                            <p>{message}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

// SSOPage.getLayout = function getLayout(page) {
//     return (
//         <>
//             {page}
//         </>
//     )
// }

export const getServerSideProps = async (context) => {
    const tokenRes = await new Promise((resolve, reject) => {
        context.req.on("data", (chunk) => {

            try {
                //console.log(`Data chunk available: ${chunk}`)
                if (chunk) {
                    const queryParams = decodeURI(`${chunk}`);
                    if (queryParams) {
                        resolve(queryParams);
                    }
                }
            } catch (e) {
                reject(null);
            }
        });
    });

    return {
        props: {
            query: context.query,
            token: tokenRes,
        }, // will be passed to the page component as props
    }
}

SSOPage.displayName='SSOPage'

export default SSOPage;