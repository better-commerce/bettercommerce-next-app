// Base Imports
import React from "react";

// Package Imports
import { BellIcon } from "@heroicons/react/outline";

// Component Imports
import Button from "@components/utils/Button/button";

const UserNotifications = () => {

    return (
        <Button classNameOverride="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
    );
};

export default UserNotifications;