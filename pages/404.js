import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <>
      <div className="w-full px-10 sm:px-20 md:px-32">
        <div className="flex flex-col min-h-full pt-16 pb-12 mt-20 bg-white rounded shadow">
          <main className="flex flex-col justify-center flex-grow px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-center flex-shrink-0">
              <Link href="/" className="inline-flex" legacyBehavior>
                <>
                  <span className="sr-only">better-next-app</span>
                  <Image
                    style={{ filter: `invert(1)` }}
                    className="w-auto h-12"
                    src="https://auth.omnicx.com/assets/themes/omnicx/img/logo-lg-commercehub.svg"
                    alt=""
                  />
                </>
              </Link>
            </div>
            <div className="py-10">
              <div className="text-center">
                <p className="text-3xl font-bold tracking-wide text-red-600 uppercase">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found.
                </h1>
                <p className="mt-4 text-base text-gray-400">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10">
                  <Link
                    href="/"
                    passHref
                    className="font-medium"
                  ><a className="p-3 border border-gray-200 rounded shadow hover:border-gray-700">Go back home <span aria-hidden="true"> &rarr;</span></a>

                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
