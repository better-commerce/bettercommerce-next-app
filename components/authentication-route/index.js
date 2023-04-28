// Base Imports
import React from "react";

// Package Imports
import Router from "next/router";
import { connect } from "react-redux";

// Other Imports
import { getLoginUrl } from "@utils/app-util";


const AuthenticatedRoute = (Component = null, options = {}) => {
    class AuthenticatedRoute extends React.Component {
        state = {
            loading: true,
        };

        constructor() {
            super();
            this.loginURL = "";

            if (typeof window !== "undefined") {
                this.loginURL = getLoginUrl();
            }
        }

        componentDidMount() {
            if (this.props.isLoggedIn) {
                this.setState({ loading: false });
            } else {
                Router.push(options?.pathAfterFailure || this.loginURL);
            }
        }

        render() {
            const { loading } = this.state;

            if (loading) {
                return <div />;
            }

            return <Component {...this.props} />;
        }
    }

    return connect((state) => ({
        isLoggedIn: state?.auth && !!state?.auth?.token,
    }))(AuthenticatedRoute);
};

export default AuthenticatedRoute;