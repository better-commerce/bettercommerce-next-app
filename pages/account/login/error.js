// Base Imports
import React from "react";

// Other Imports
import { APP_ROUTES } from "utils/constants";

const LoginErrorPage = (props) => {

    return (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
            <div className="flex items-center"></div>
            <div>
                Your credentials could not be verified. Please try again <a href={APP_ROUTES.HOME}></a>.
            </div>
        </div>
    );
}

LoginErrorPage.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export default LoginErrorPage;