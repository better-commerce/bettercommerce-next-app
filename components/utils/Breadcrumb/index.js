import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/outline";

const Breadcrumb = ({ pages = [], onClick = null }) => {
  return (
    <nav className="flex p-0 mb-4 bg-transparent breadcrumb" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        {pages.map((page, idx) => (
          <li key={`${page.name}-${idx}`}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 w-3 h-3 mr-2 text-gray-300"
                aria-hidden="true"
              />
              {
                onClick ? (
                  <Link
                    href={page.href}
                    passHref
                    className="ml-1 text-sm"
                    aria-current={page.current ? "page" : undefined}
                    legacyBehavior
                  >
                    <a
                      data-id={page?.data}
                      className={page.current ? "ml-1 text-sm font-normal text-gray-400 hover:text-gray-700" : "ml-1 text-sm font-normal text-gray-600 hover:text-gray-700"}
                      onClick={(e) => {
                        if (page?.data) {
                          onClick(e.target.attributes["data-id"].nodeValue);
                        }
                      }}
                    >
                      {page.name}
                    </a>
                  </Link>
                ) : (
                  <Link
                    href={page.href}
                    passHref
                    className="ml-1 text-sm"
                    aria-current={page.current ? "page" : undefined}
                    legacyBehavior
                  >
                    <a
                      className={page.current ? "ml-1 text-sm font-normal text-gray-400 hover:text-gray-700" : "ml-1 text-sm font-normal text-gray-600 hover:text-gray-700"}
                      data-id={page?.data}
                    >
                      {page.name}
                    </a>
                  </Link>
                )
              }
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;


