import Link from 'next/link';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';

const Navbar = () => {
  // To open the popout div
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`relative top-0 w-full font-inter shadow-md overflow-hidden bg-white flex justify-between items-center px-5 lg:px-10 py-5 z-10 max-w-screen`}
    >
      {/* Logo on the left side - linked to home page */}
      <Link className="flex items-center gap-x-2" href="/">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725986240/plant_d1wkt7.png"
          alt="The Thought Journal"
          className="h-10 w-10 md:h-10 md:w-10 cursor-pointer bg-transparent -translate-y-0.5"
        ></img>
        <p className="mx-1 italic font-medium text-lg  md:text-xl text-cta">
          Plant for the Planet
        </p>
      </Link>

      {/* Links at the right side - displayed on larger screens */}
      <div className="flex gap-x-5 lg:gap-x-8 font-medium items-center">
        {/* Search Icon - takes to search page. */}

        {/* Link to signup page */}
        <Link href="/signup" className="hidden lg:block">
          Sign up
        </Link>

        {/* Link to login page */}
        <Link href="/login" className="hidden lg:block">
          Login
        </Link>

        {/* Contains Popup for account & Hamburger button. */}
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
              alt="Logo"
              className="h-10 w-10 md:h-10 md:w-10 cursor-pointer bg-transparent -translate-y-0.5"
            ></img>
            <p className="mx-2 italic font-medium text-lg md:text-lg text-cta">
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
              href="/"
              className="hover:text-cta cursor-pointer transition-all"
            >
              Home
            </Link>
          </p>
          {/* Link to create post page - not shown if already on create post page */}

          {/* Link to signup page */}

          <p className="my-2">
            <Link
              href="/signup"
              className="hover:text-cta cursor-pointer transition-all"
            >
              Sign up
            </Link>
          </p>

          {/* Link to login page */}

          <p className="my-2">
            <Link
              href="/login"
              className="hover:text-cta cursor-pointer transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
