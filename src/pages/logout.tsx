import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useDBUser } from '@/context/userContext';
import CTAButton from '@/components/CTAButton';
import axios from 'axios';
import RingLoader from 'react-spinners/RingLoader';

const Login = () => {
  const router = useRouter();
  // Context to store user data from DB (on sign in)
  const context = useDBUser();
  // To disable button
  const [disabled, setDisabled] = useState<boolean>(false);
  //  Loading screen
  const [loading, setLoading] = useState<boolean>(true);

  // Taking user to login page if user has not signed in
  useEffect(() => {
    if (!context?.dbUser?.username || context?.dbUser?.username?.length == 0) {
      setLoading(true);
      axios
        .get('/api/getUser')
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast('You have not logged in!');
          router.replace('/login');
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
    } else {
      setLoading(false);
    }
  }, [context?.dbUser?.username]);

  const logout = () => {
    setDisabled(true);

    axios
      .get('/api/logout')
      .then((res) => {
        console.log(res);
        setDisabled(false);
        context?.setDbUser({
          email: '',
          username: '',
          name: '',
          gender: '',
          description: null,
          dateOfBirth: '',
        });
        router.replace('/login');
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
        toast.error('Something went wrong.');
      });
  };

  return (
    <>
      {loading ? (
        <div className="h-screen -pt-10 bg-hovercta bg-opacity-10 flex justify-center items-center">
          <RingLoader
            color={'#678b18'}
            loading={loading}
            className="-translate-y-10"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="min-h-screen relative flex w-full bg-hovercta bg-opacity-10">
          {/* Main Div */}
          <div className="mt-5 no-scrollbar animate__animated animate__fadeInUp overflow-hidden lg:mt-0 lg:h-full lg:min-h-[88vh] pb-10 flex-1 flex justify-center items-start pt-10">
            {/* Profile Edit Div */}
            <div className="bg-white max-w-[95%] border-[1px] md:-translate-y-0 px-8 mt-5 md:mt-14 lg:mt-5 p-5 md:px-16 shadow-xl rounded-xl pb-10">
              {/* Title */}
              <h1 className="flex justify-center items-center gap-x-2 text-textcta font-bold text-2xl mt-5 text-center">
                Do you want to log out?
              </h1>

              {/* Logout image */}
              <img
                alt="logout"
                src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1726139139/undraw_japan_ubgk_meatgr.svg"
                className="h-80 w-80"
              />

              {/* Button to log out */}
              <CTAButton
                onClick={logout}
                className="w-full"
                text="Log Out"
                disabled={disabled}
                disabledText="Please Wait..."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
