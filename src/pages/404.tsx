import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-start pt-60 md:items-center md:pt-0 bg-index3 bg-cover lg:py-0 lg:gap-y-0">
      <div className="flex justify-center items-center">
        <div className="animate__animated animate__fadeInUp -translate-y-32 max-w-[95%] flex flex-col items-center gap-y-5 z-5 bg-white p-10 rounded-xl shadow-xl hover:scale-110 transition-all">
          <p className="text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-md md:text-2xl py-1.5 pl-1 font-medium">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className="text-nowrap">
              Oops! Looks like you&apos;re lost in the forest
            </span>
            <br />
            <span className="text-nowrap">
              Let&apos;s guide you back to the trail!
            </span>
          </p>
          <Link
            href="/"
            className="text-white font-medium px-5 py-1.5 bg-gradient-to-r from-cta to-hovercta rounded-lg hover:scale-105 transition-all"
          >
            Let&apos;s go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
