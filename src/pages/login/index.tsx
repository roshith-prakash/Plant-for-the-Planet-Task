import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import CTAButton from '@/components/CTAButton';
import { useState } from 'react';
import ErrorStatement from '@/components/ErrorStatement';
import { useRouter } from 'next/router';
import { LoginError } from '@/types/types';

const Login = () => {
  const router = useRouter();
  // State to store the username entered
  const [username, setUsername] = useState<string | undefined>(undefined);
  // State to store the password entered
  const [password, setPassword] = useState<string | undefined>(undefined);
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
      console.log('Username empty');
      setError((prev) => ({ ...prev, username: 1 }));
      return;
    }

    // Check if password is entered
    if (password == undefined || password.length <= 0) {
      console.log('Password empty');
      setError((prev) => ({ ...prev, password: 1 }));
      return;
    }

    // Go to edit-profile page
    router.push('edit-profile');
  };

  console.log(username);
  console.log(password);

  return (
    <div className="lg:min-h-screen flex items-center w-full bg-none lg:bg-bgwhite bg-green-700 bg-opacity-10">
      {/* Image Div - displayed only on laptop */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725972725/login_iesapr.svg"
          className="max-w-[70%] pointer-events-none"
        />
      </div>

      {/* Right Div */}
      <div className="min-h-screen mt-5 lg:mt-0 lg:h-full lg:min-h-[88vh] pb-10 flex-1 flex justify-center items-center">
        {/* Login Form Div */}
        <div className="bg-white min-w-[23rem] border-[1px] -translate-y-5 md:-translate-y-0 px-8 md:w-[65%] mt-5 md:mt-14 lg:mt-5 p-5 md:px-20 shadow-xl rounded-xl pb-10">
          {/* Title */}
          <h1 className="text-ink bg-gradient-to-r from-cta to-hovercta bg-clip-text text-transparent font-bold text-2xl mt-5 text-center">
            Log in
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
              <ErrorStatement text={'Please enter a valid username.'} />
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
                  'Password must be 8 characters long and must contain an uppercase letter, lowercase letter, number and special character.'
                }
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <CTAButton
              onClick={submit}
              className="w-full"
              // disabled={disabled}
              // disabledText="Please Wait..."
              text={'Log in'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
