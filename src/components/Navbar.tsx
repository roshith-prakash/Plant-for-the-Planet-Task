import Link from 'next/link';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';
import { useDBUser } from '@/context/userContext';

const Navbar = () => {
  // To open the popout div
  const [open, setOpen] = useState<boolean>(false);
  const context = useDBUser();

  console.log(context?.dbUser?.username);

  return (
    <div
      className={`relative top-0 w-full font-inter shadow-md overflow-hidden bg-white flex justify-between items-center px-5 lg:px-10 py-5 z-10 max-w-screen`}
    >
      {/* Logo on the left side - linked to home page */}
      <Link
        className="animate__animated animate__fadeInLeft flex items-center gap-x-2"
        href="/"
      >
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725986240/plant_d1wkt7.png"
          alt="Plant for the Planet"
          className="h-10 w-10 md:h-10 md:w-10 cursor-pointer bg-transparent -translate-y-0.5"
        ></img>
        <p className="mx-1 italic font-medium text-lg  md:text-xl text-textcta">
          Plant for the Planet
        </p>
      </Link>

      {/* Links at the right side - displayed on larger screens */}
      <div className="animate__animated animate__fadeInRight text-lg flex gap-x-5 lg:gap-x-8 font-medium items-center">
        {/* Search Icon - takes to search page. */}

        {/* Link to signup page */}
        {(!context?.dbUser?.username ||
          context?.dbUser?.username?.length == 0) && (
          <Link
            href="/signup"
            className="hidden lg:block hover:text-textcta cursor-pointer transition-all"
          >
            Sign up
          </Link>
        )}

        {/* Link to login page */}
        {(!context?.dbUser?.username ||
          context?.dbUser?.username?.length == 0) && (
          <Link
            href="/login"
            className="hidden lg:block hover:text-textcta cursor-pointer transition-all"
          >
            Login
          </Link>
        )}

        {/* Link to profile page */}
        {context?.dbUser?.username && context?.dbUser?.username?.length > 0 && (
          <div className="hidden lg:flex items-center gap-x-1">
            Hey,
            <Link
              href="/edit-profile"
              className=" hover:text-textcta cursor-pointer transition-all"
            >
              {context?.dbUser?.name}
            </Link>
          </div>
        )}

        {/* Link to log out page */}
        {context?.dbUser?.username && context?.dbUser?.username?.length > 0 && (
          <Link
            href="/logout"
            className="hidden lg:block hover:text-textcta cursor-pointer transition-all"
          >
            Log Out
          </Link>
        )}

        {/* Contains Hamburger button to open popout div. */}
        <div className="flex items-center gap-x-5">
          <div className="lg:hidden flex items-center gap-x-5">
            <RxHamburgerMenu
              onClick={() => setOpen(true)}
              className="cursor-pointer text-xl text-ink"
            />
          </div>
        </div>
      </div>

      {/* Pop out div - displayed when hamburger is clicked  */}
      <div
        className={`lg:hidden h-screen w-full text-xl md:text-lg fixed top-0 right-0 z-10 bg-white pb-6 text-center shadow-md ${
          open ? 'translate-x-0' : 'translate-x-[100%]'
        } transition-all duration-500`}
      >
        <div className="flex justify-between items-center pt-5 px-5 mb-14">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725986240/plant_d1wkt7.png"
              alt="Plant for the Planet"
              className="h-10 w-10 md:h-10 md:w-10 cursor-pointer bg-transparent -translate-y-0.5"
            ></img>
            <p className="mx-2 italic font-medium text-lg md:text-lg text-textcta">
              Plant for the Planet
            </p>
          </div>
          {/* Close drawer */}
          <RxCross2
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl text-ink"
          />
        </div>
        <div className="px-8 mt-20 text-2xl flex flex-col gap-y-3">
          {/* Link to Home */}

          <p className="my-2">
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className="hover:text-textcta cursor-pointer transition-all"
            >
              Home
            </Link>
          </p>

          {/* Link to signup page */}
          {(!context?.dbUser?.username ||
            context?.dbUser?.username?.length == 0) && (
            <p className="my-2">
              <Link
                onClick={() => setOpen(false)}
                href="/signup"
                className="hover:text-textcta cursor-pointer transition-all"
              >
                Sign up
              </Link>
            </p>
          )}

          {/* Link to login page */}
          {(!context?.dbUser?.username ||
            context?.dbUser?.username?.length == 0) && (
            <p className="my-2">
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="hover:text-textcta cursor-pointer transition-all"
              >
                Log in
              </Link>
            </p>
          )}

          {/* Link to edit-profile page */}
          {context?.dbUser?.username &&
            context?.dbUser?.username?.length > 0 && (
              <p className="my-2 flex justify-center items-center gap-x-1">
                Hey,
                <Link
                  onClick={() => setOpen(false)}
                  href="/edit-profile"
                  className="hover:text-textcta cursor-pointer transition-all"
                >
                  {context?.dbUser?.name}
                </Link>
              </p>
            )}

          {/* Link to log out page */}
          {context?.dbUser?.username &&
            context?.dbUser?.username?.length > 0 && (
              <p className="my-2">
                <Link
                  onClick={() => setOpen(false)}
                  href="/logout"
                  className="hover:text-textcta cursor-pointer transition-all"
                >
                  Log Out
                </Link>
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
