// Base Imports
import React, { useEffect } from "react";

// Package Imports
import { useRouter } from "next/router";

// Component Imports
import Loader from "@components/utils/Loader/loader";

// Other Imports
//import { store } from "redux/store";
import { AUTH_BASE_URL } from "@utils/constants";

function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const authUrl = `${AUTH_BASE_URL}?appUrl=${window.location.origin}&source=external`;
        router.push(authUrl);
    }, []);

    return (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
            <div className="flex items-center"></div>
            <Loader />
        </div>
    );
}

LoginPage.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export default LoginPage;