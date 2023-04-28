import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { AUTH_CURRENT_MODULE } from '@utils/constants';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';

const Nav = ({ navTree }) => {
  const router = useRouter();
  const [openState, setOpenState] = useState(false);
  const [openModule, setopenModule] = useState(false);
  function handleClick() {
    setOpenState(true);
  }
  function handleClose() {
    setOpenState(false);
  }

  function showModule() {
    setopenModule(true);
  }
  function closeModule() {
    setopenModule(false);
  }

  const cmsNavTree = navTree?.navTree?.items?.find(
    (x) => x.displayText === AUTH_CURRENT_MODULE
  );

  return (
    <>
      <nav
        className="flex-1 px-0 py-4 space-y-1 expended side-menu-parent-data"
        aria-label="Sidebar"
      >
        {cmsNavTree?.items?.map((item, idx) => (
          <div key={item.id} className="top-menu-parent">
            <Link href={item.link ?? '#'} legacyBehavior>
              <a
                href={item.link ?? '#'}
                className={classNames(
                  router.pathname.toLowerCase() === item.link.toLowerCase() ||
                    (!item.link &&
                      item?.items?.length &&
                      item?.items?.find(
                        (x) =>
                          x.link.toLowerCase() === router.pathname.toLowerCase()
                      ))
                    ? 'bg-blue-900 text-white'
                    : 'text-white hover:bg-blue-900',
                  'group w-full flex items-center py-3 text-md font-normal side-menu-child '
                )}
              >
                <>
                  <span
                    className={`item-icon icon-${item.menu
                      .toLowerCase()
                      .replace(' ', '-')
                      .replace('&', '')}`}
                  ></span>
                  <span className="relative w-full item-name">
                    {item.displayText}
                    {item.items.length > 0 && (
                      <>
                        <ChevronRightIcon className="absolute inline-block w-5 h-5 text-white right-2 top-4 chev-icon"></ChevronRightIcon>
                      </>
                    )}
                  </span>
                </>
              </a>
            </Link>
            {item.items != '' && (
              <ul className="flex-col hidden pl-10 my-0 child-sub-menu">
                {item.items.map((subItems, sidx) => (
                  <li
                    className="flex items-center w-full py-1 pl-4 font-normal text-white cursor-pointer text-md"
                    key={sidx}
                  >
                    <Link href={subItems.link} passHref legacyBehavior>
                      <a className="text-white">
                        <span className="child-item-name">
                          {subItems.menu}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Nav;
