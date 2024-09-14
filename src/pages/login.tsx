import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import CTAButton from '@/components/CTAButton';
import { useEffect, useState } from 'react';
import ErrorStatement from '@/components/ErrorStatement';
import { useRouter } from 'next/router';
import { LoginError } from '@/types/types';
import { GiPineTree } from 'react-icons/gi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDBUser } from '@/context/userContext';
import Link from 'next/link';
import RingLoader from 'react-spinners/RingLoader';
import { isValidPassword, isValidUsername } from '@/utils/validation';

const Login = () => {
  const router = useRouter();
  // Context to store user data from DB (on sign in)
  const context = useDBUser();
  // State to store the username entered
  const [username, setUsername] = useState<string | undefined>(undefined);
  // State to store the password entered
  const [password, setPassword] = useState<string | undefined>(undefined);
  // To disable button
  const [disabled, setDisabled] = useState<boolean>(false);
  // Loading screen
  const [loading, setLoading] = useState<boolean>(true);
  // State to show the error
  const [error, setError] = useState<LoginError>({
    username: 0,
    password: 0,
  });

  const submit = () => {
    // Reset error states
    setError({
      username: 0,
      password: 0,
    });

    // Check if username is entered
    if (username == undefined || username.length <= 0) {
      setError((prev) => ({ ...prev, username: 1 }));
      return;
    }

    // Check if username is atleast 3 characters
    if (username.length < 3) {
      setError((prev) => ({ ...prev, username: 2 }));
      return;
    }

    // Check if username is longer than 15 characters
    if (username.length > 15) {
      setError((prev) => ({ ...prev, username: 3 }));
      return;
    }

    // Check if username contains only lowercase characters and numbers
    if (!isValidUsername(username)) {
      setError((prev) => ({ ...prev, username: 4 }));
      return;
    }

    // Check if password is entered
    if (password == undefined || password.length <= 0) {
      setError((prev) => ({ ...prev, password: 1 }));
      return;
    }

    // Check if password is a valid password
    if (!isValidPassword(password)) {
      setError((prev) => ({ ...prev, password: 2 }));
      return;
    }

    // Check if password is longer than 20 characters
    if (password.length > 20) {
      setError((prev) => ({ ...prev, password: 3 }));
      return;
    }

    // Disable button
    setDisabled(true);

    // Call login API
    axios
      .post('/api/login', {
        user: {
          password,
          username,
        },
      })
      .then((res) => {
        // Set user in context
        context?.setDbUser(res.data.user);
        // Enable button
        setDisabled(false);
        // Toast notification
        toast.success('Logged in!');
        // Go to edit-profile page
        router.push('edit-profile');
      })
      .catch((err) => {
        // Notify user if error occured
        setDisabled(false);
        console.log(err);
        console.log(err.response.data);
        console.log(err.status);

        toast.error(err.response.data.message);
      });
  };

  // Taking user to profile page if already logged in
  useEffect(() => {
    // If context does not have data
    if (context?.dbUser?.username || context?.dbUser?.username?.length == 0) {
      setLoading(true);

      // Call api to get user data (if cookie is present)
      axios
        .get('/api/getUser')
        .then((res) => {
          // Data is present - redirect to profile page
          console.log(res);
          router.replace('/edit-profile');
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          // Data is not present - show Login page
          console.log(err);
          setLoading(false);
        });
    } else {
      // Context has data - redirect to profile page
      router.replace('/edit-profile');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [context?.dbUser?.username]);

  return (
    <>
      {loading ? (
        // Loading screen to be displayed when checking if user is logged in
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
        <div className="min-h-screen flex items-center w-full bg-hovercta bg-opacity-10">
          {/* Image Div - displayed only on laptop */}
          <div className="hidden animate__animated animate__fadeInUp lg:flex lg:flex-1 items-center justify-center">
            <img
              src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725972725/login_iesapr.svg"
              className="max-w-[70%] pointer-events-none"
            />
          </div>

          {/* Right Div */}
          <div className="min-h-screen  -translate-y-10 lg:translate-y-0 lg:mt-0 lg:h-full lg:min-h-[88vh] pb-10 flex-1 flex justify-center items-center">
            {/* Login Form Div */}
            <div className=" bg-white animate__animated animate__fadeInUp  min-w-[23rem] max-w-[98%] w-[80%] border-[1px] -translate-y-5 md:-translate-y-0 px-8 md:w-[65%] mt-5  lg:mt-5 p-5 md:px-20 shadow-xl rounded-xl pb-10">
              {/* Title */}
              <h1 className="flex justify-center items-center gap-x-2 text-textcta font-bold text-2xl mt-5 text-center">
                <GiPineTree className="text-textcta" /> Log In
                <GiPineTree className="text-textcta" />
              </h1>

              {/* Username Input field */}
              <div className="mt-8 px-2">
                <p className="font-medium">Username</p>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={'Enter your username'}
                />
                {error.username == 1 && (
                  <ErrorStatement text={'Please enter your username.'} />
                )}
                {error.username == 2 && (
                  <ErrorStatement
                    text={'Username must be atleast 3 characters long.'}
                  />
                )}
                {error.username == 3 && (
                  <ErrorStatement
                    text={'Username can be at max 15 characters long.'}
                  />
                )}
                {error.username == 4 && (
                  <ErrorStatement
                    text={
                      'Username can only contain lowercase characters and numbers.'
                    }
                  />
                )}
              </div>

              {/* Password Input field */}
              <div className="mt-6 px-2">
                <p className="font-medium">Password</p>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={'Enter your password'}
                />
                {error.password == 1 && (
                  <ErrorStatement text={'Please enter a password.'} />
                )}
                {error.password == 2 && (
                  <ErrorStatement
                    text={
                      'Password must be 8 characters long and must contain an uppercase letter, lowercase letter, number and special character. Cannot contain spaces.'
                    }
                  />
                )}
                {error.password == 3 && (
                  <ErrorStatement
                    text={'Password can be at max 20 characters long.'}
                  />
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-12">
                <CTAButton
                  onClick={submit}
                  className="w-full"
                  disabled={disabled}
                  disabledText="Please Wait..."
                  text={'Log in'}
                />
              </div>

              <p className="mt-5 text-center">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-textcta text-nowrap hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
