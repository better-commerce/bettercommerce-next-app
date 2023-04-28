import { Fragment, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Dialog, Transition, Listbox, Menu } from "@headlessui/react";
import {
  MenuAlt2Icon, XIcon, ArrowLeftIcon, GlobeAltIcon, ViewGridIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  CheckIcon, SelectorIcon, ChevronDownIcon, DotsVerticalIcon, MenuIcon
} from "@heroicons/react/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
import Nav from "@components/nav/nav";
import Button from "@components/utils/Button/button";
import { resetUser, setNavTree } from "@redux/auth";
import { useRouter } from "next/router";
import { API_TOKEN, AUTH_TOKEN } from "@utils/constants";
import { useTypedDispatch } from "@redux/store";
import { getLoginUrl, getLogoutUrl } from "@utils/app-util";
import { decodeToken } from "@utils/token-util";
import ProfileDropdown from "@components/nav/profile-dropdown";
import { UserIcon, UsersIcon, ShieldCheckIcon, InformationCircleIcon, FolderIcon, ChatIcon, InboxIcon, LogoutIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Layout = memo(({ children, auth, orgId, domains, userId }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [open, setOpen] = useState(false)
  const [getState, setGetState] = useState(false);

  const [openModule, setOpenModule] = useState(false)
  const { navTree, token } = useSelector((state) => state.auth);

  function handleClick() {
    setOpenState(true);
  }
  function handleClose() {
    setOpenState(false);
  }

  const showOrgClick = () => {
    setOpen(true);
  }
  const userNavigation = [
    { name: "My Profile", href: "https://commerce.bettercommerce.io/Account/UserProfileDetail", icon: UserIcon },
    { name: "Users", href: "https://account.bettercommerce.io/Account/Users", icon: UsersIcon },
    { name: "Roles", href: "https://account.bettercommerce.io/Admin/RoleGroups", icon: ShieldCheckIcon },
  ];
  const knowledgeNavigation = [
    { name: "Help Center", href: "https://omnicx.freshdesk.com/support/home", icon: InformationCircleIcon },
    { name: "Knowledge Base", href: "https://omnicx.freshdesk.com/a/solutions", icon: FolderIcon },
    { name: "Forums", href: "https://omnicx.freshdesk.com/a/forums/", icon: ChatIcon },
    { name: "Tickets", href: "https://omnicx.freshdesk.com/a/tickets/filters/all_tickets", icon: InboxIcon },
  ];

  const logoutNavigation = [
    {
      name: "Logout",
      href: "#",
      icon: LogoutIcon,
      onClick: (e) => {
        const redirectUrl = getLogoutUrl();
        window.location.href = redirectUrl;

        setTimeout(() => {
          dispatch(resetUser());
        }, 200);
      },
    },
  ];
  const switchOrg = (orgId) => {
    if (orgId) {
      const url = getLoginUrl(orgId);
      router.replace(url);
    }
  };

  const switchDomain = (domainName) => {
    if (domainName) {
      const domainId = domains?.find(x => x.name === domainName)?.recordId;
      const findOrg = navTree?.orgs?.find(x => x.isDefault);
      const url = getLoginUrl(findOrg?.recordId, domainId);
      router.replace(url);
    }
  };

  const getSelectedDomainName = () => {
    if (token) {
      const tokenValue = decodeToken(token);
      if (tokenValue && tokenValue.DomainId) {
        return domains?.find(x => x.recordId === tokenValue.DomainId)?.name;
      }
    }
    return "";
  }

  const getSelectedDomainId = (domainId) => {
    if (token) {
      const tokenValue = decodeToken(token);
      if (tokenValue && tokenValue.DomainId) {
        return (domainId == tokenValue.DomainId);
      }
    }
    return false;
  }

  const getProfileName = () => {
    if (token) {
      const tokenValue = decodeToken(token);
      if (tokenValue) {
        let name = "";
        if (tokenValue.FirstName) {
          name = tokenValue.FirstName.substring(0, 1);
        }

        if (tokenValue.LastName) {
          name = `${name} ${tokenValue.LastName.substring(0, 1)}`;
        }

        return name;
      }
    }
    return "";
  }

  useEffect(() => {
    setGetState(true)
  }, [])

  return (
    <>
      {/* client-side rendering to stop hydration error */}
      {getState && (
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-40 flex md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex flex-col flex-1 w-full max-w-xs pt-0 pb-4 side-menu-parent">
                  <div className="flex-1 h-0 overflow-y-auto">
                    <Nav navTree={navTree} />
                    <div className="fixed bottom-5 grid-icon">
                      <ViewGridIcon className="font-bold text-white cursor-pointer w-7 h-7" onClick={() => setOpenModule(true)}></ViewGridIcon>
                    </div>
                    <div className="fixed bottom-5 left-arrow">
                      <ChevronDoubleLeftIcon className="w-5 h-6 font-bold text-white cursor-pointer" onClick={() => setSidebarOpen(false)}></ChevronDoubleLeftIcon>
                    </div>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="z-40 hidden md:flex md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className=
              {classNames(
                openState ? `expended` : `collepsed`,
                `flex-1 flex flex-col min-h-0 side-menu-parent`)}
            >
              {/*LOGO PANEL*/}
              <div className="flex items-center justify-center flex-shrink-0 h-12 px-2 bg-white">
                <Link href="/" passHref legacyBehavior>
                  <a><span className={classNames(openState ? `logo-lg-pim` : `logo-cx-pim`, `logo-sprite `)}></span></a>
                </Link>
              </div>
              {/*LOGO PANEL END*/}

              <div className="flex flex-col flex-1 py-0">
                <Nav navTree={navTree} />
                {openState &&
                  <>
                    <div className="fixed bottom-5 grid-icon">
                      <ViewGridIcon className="font-bold text-white cursor-pointer w-7 h-7" onClick={() => setOpenModule(true)}></ViewGridIcon>
                    </div>
                    <div className="fixed bottom-5 left-arrow">
                      <ChevronDoubleLeftIcon className="w-5 h-6 font-bold text-white cursor-pointer" onClick={handleClose}></ChevronDoubleLeftIcon>
                    </div>
                  </>
                }
                {!openState &&
                  <>
                    <div className="fixed bottom-16 left-4">
                      <ViewGridIcon className="font-bold text-white cursor-pointer w-7 h-7" onClick={() => setOpenModule(true)}></ViewGridIcon>
                    </div>
                    <div className="fixed bottom-5 left-5">
                      <ChevronDoubleRightIcon className="w-5 h-6 font-bold text-white cursor-pointer" onClick={handleClick}></ChevronDoubleRightIcon>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          <div className={classNames(openState ? `expended` : `collepsed`, `sidebar-closed flex flex-col `)}
          >
            <div className="sticky top-0 z-50 flex flex-shrink-0 h-12 bg-white border-b border-gray-200">
              <Button
                classNameOverride="px-4 text-gray-500 focus:outline-none md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="w-6 h-6 text-black" aria-hidden="true" />
              </Button>
              <div className="flex justify-between flex-1 pr-4">
                <div className="flex flex-1">
                  <Listbox onChange={(value) => switchDomain(value)}>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full py-1 pl-3 pr-16 text-left border border-gray-100 rounded cursor-pointer bg-gray-table focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{getSelectedDomainName()}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDownIcon
                            className="w-4 h-4 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {domains?.length
                            ? domains?.map((domain, idx) => (
                              <Listbox.Option
                                key={`domain-${idx}`}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-3 pr-4 ${active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                                  }`
                                }
                                value={domain.name}
                                selected={getSelectedDomainId(domain.recordId)}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {domain.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))
                            : null}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div className="flex items-center ml-4 md:ml-6">
                  {/* Profile dropdown */}
                  <ProfileDropdown userNavigation={userNavigation} knowledgeNavigation={knowledgeNavigation} logoutNavigation={logoutNavigation} name={getProfileName()} orgId={orgId} navTree={navTree} showOrgClick={showOrgClick} />
                </div>
              </div>
            </div>

            <main className="flex-1 bg-light-gray">
              <div className="py-0 pb-0">
                <div className="w-full px-4 mx-auto sm:px-6 md:px-8">
                </div>
                <div className="w-full mx-auto">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      )}

      {/* MODULE SWITCH TRANSITION PAEL USING HEADLESS UI COMPONENTS */}
      <Transition.Root show={openModule} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenModule}>
          <div className="fixed inset-0 left-0 bg-black/30" />

          <div className="fixed inset-x-0 overflow-hidden">
            <div className="absolute inset-x-0 overflow-hidden">
              <div className="fixed inset-y-0 left-0 flex max-w-full pr-10 pointer-events-none sm:pr-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-400"
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-400"
                  leaveFrom="-translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="relative z-50 flex flex-col h-full bg-white shadow-xl">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start">
                          <button
                            type="button"
                            className="mr-2 text-gray-900 bg-white rounded-md outline-none hover:text-gray-500"
                            onClick={() => setOpenModule(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <ArrowLeftIcon className="relative w-5 h-5 top-1" aria-hidden="true" />
                          </button>
                          <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900 uppercase">
                            SWITCH TO
                          </h2>
                        </div>
                      </div>
                      {/* Main */}
                      <div className="p-6 overflow-y-auto">
                        {navTree?.navTree?.items?.map((module, idx) => (
                          <a href={module.link}
                            className=
                            {classNames(
                              module.menu == navTree.currentModule ? `bg-${module.menu.toLowerCase()}-active inbox-item-active` : `bg-${module.menu.toLowerCase()} hover:bg-${module.menu.toLowerCase()} `,
                              `p-2 grid grid-cols-12 gap-x-1 inbox-item mb-3 rounded-lg`)} key={module.id}>
                            <div className="col-span-2">
                              <span className={`logo-sprite module-top logo-cx-${module.menu.toLowerCase()}`}></span>
                            </div>
                            <div className="col-span-10">
                              <h2 className={`font-semibold text-md`}>{module.menu}</h2>
                              <p className="text-xs para">{module.helpText}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ORG SWITCH TRANSITION PANEL USING HEADLESS UI COMPONENTS */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 left-0 bg-black/30" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-400"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-400"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="relative z-50 flex flex-col h-full bg-white shadow-xl">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start">
                          <button
                            type="button"
                            className="mr-2 text-gray-900 bg-white rounded-md outline-none hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <ArrowLeftIcon className="relative w-5 h-5 top-1" aria-hidden="true" />
                          </button>
                          <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900 uppercase">
                            Switch Org
                          </h2>
                        </div>
                      </div>
                      {/* Main */}
                      <div className="p-6 overflow-y-auto">
                        {navTree?.orgs?.map((org, idx) => (
                          <a href="#"
                            onClick={() => switchOrg(org.recordId)}
                            className={classNames(
                              (org.recordId == orgId) ? "bg-blue-700 hover:bg-blue-700 text-white" : "bg-white text-gray-500 hover:bg-gray-100",
                              "p-2 grid grid-cols-12 gap-x-1 pl-8 inbox-item mb-1 rounded-lg"
                            )}
                            key={org.recordId}>
                            <div className={`col-span-12 `}>
                              <h2 className={`font-normal text-sm`}>
                                <GlobeAltIcon className="inline-block w-5 h-5 mr-1" />{org.name}
                              </h2>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
});
Layout.displayName = 'Layout';
export default Layout;
