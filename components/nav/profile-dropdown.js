// Base Imports
import React, { Fragment } from "react";
import Image from "next/image";
import { GlobeAltIcon } from "@heroicons/react/outline";
// Package Imports
import classNames from "classnames";
import { Avatar, Grid } from "@nextui-org/react";

// Package Imports
import { Menu, Transition } from "@headlessui/react";

const ProfileDropdown = ({ userNavigation, knowledgeNavigation, logoutNavigation, name, orgId, navTree, showOrgClick }) => {

    const currentOrgName = () => {
        return navTree?.orgs?.find(x => x.recordId == orgId)?.name;
        // return navTree?.orgs?.find(x => x.isDefault)?.name;
    };

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex items-center bg-white rounded-full cursor-pointer nav-avatar">
                    <span className="sr-only">Open user menu</span>
                    <Grid>
                        <Avatar
                            size="md"
                            text={name || "Hi"}
                            color="secondary"
                            textColor="white"
                            bordered
                            className="cursor-pointer"
                        />
                    </Grid>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-50 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none min-250">

                    <div className="flex flex-1 px-4 py-2">
                        <p className="text-xs font-normal text-gray-600">Welcome</p>
                    </div>
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a
                                    href={item.href}
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-500"
                                    )}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    }}
                                >
                                    <item.icon className="inline w-4 h-4 mr-2"></item.icon>
                                    {item.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}

                    {navTree?.orgs && navTree?.orgs?.length > 1 ? (
                        <Menu.Item>
                            <a className="flex justify-between px-4 py-4 my-2 text-sm text-gray-700 border-t border-b">

                                {
                                    orgId && (
                                        <>
                                            <div className="font-medium text-dark"><GlobeAltIcon className="inline w-4 h-4 mr-0"></GlobeAltIcon> {currentOrgName()}</div>
                                            <div className="text-blue-600 font-semibold relative top-0.5 text-xs cursor-pointer" onClick={showOrgClick}>Switch</div>
                                        </>
                                    )
                                }

                            </a>
                        </Menu.Item>
                    ) : (
                        <></>
                    )}
                    {knowledgeNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a
                                    target="_blank" rel="noreferrer"
                                    href={item.href}
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-500"
                                    )}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    }}
                                >
                                    <item.icon className="inline w-4 h-4 mr-2"></item.icon>
                                    {item.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                    {logoutNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a
                                    href={item.href}
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-4 text-sm text-gray-500 border-t"
                                    )}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    }}
                                >
                                    <item.icon className="inline w-4 h-4 mr-2"></item.icon>
                                    {item.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default ProfileDropdown;