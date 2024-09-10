import ErrorStatement from '@/components/ErrorStatement';
import PasswordInput from '@/components/PasswordInput';
import Input from '@/components/Input';
import CTAButton from '@/components/CTAButton';
import TextArea from '@/components/TextArea';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SignupError } from '@/types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isValidEmail } from '@/utils/validation';

const Signup = () => {
  const router = useRouter();
  // State to store the name
  const [name, setName] = useState<string | undefined>(undefined);
  // State to store the email
  const [email, setEmail] = useState<string | undefined>(undefined);
  // State to store the username
  const [username, setUsername] = useState<string | undefined>(undefined);
  // State to store the password
  const [password, setPassword] = useState<string | undefined>(undefined);
  // State to store the gender
  const [gender, setGender] = useState<string | undefined>(undefined);
  // State to store the description
  const [description, setDescription] = useState<string | undefined>(undefined);
  // State to store Date of Birth
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>(undefined);
  // To disable button
  const [disabled, setDisabled] = useState<boolean>(false);
  // State to show the error
  const [error, setError] = useState<SignupError>({
    username: 0,
    password: 0,
    email: 0,
    name: 0,
    gender: 0,
    date: 0,
  });

  const submit = () => {
    // Reset error states
    setError({
      username: 0,
      password: 0,
      email: 0,
      name: 0,
      gender: 0,
      date: 0,
    });

    setDisabled(true);

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

    // Check if Name is entered
    if (name == undefined || name.length <= 0) {
      console.log('Name empty');
      setError((prev) => ({ ...prev, name: 1 }));
      return;
    }

    // Check if Email is entered
    if (email == undefined || email.length <= 0) {
      console.log('Email empty');
      setError((prev) => ({ ...prev, email: 1 }));
      return;
    }

    // Check if email is a valid email
    if (!isValidEmail(email)) {
      console.log('Invalid email address format');
      setError((prev) => ({ ...prev, email: 2 }));
      return;
    }

    // Check if Gender is selected
    if (gender == undefined) {
      console.log('Password empty');
      setError((prev) => ({ ...prev, gender: 1 }));
      return;
    }

    // Check if Date is entered
    if (gender == undefined) {
      console.log('Date not selected');
      setError((prev) => ({ ...prev, date: 1 }));
      return;
    }

    setDisabled(false);

    // Go to edit-profile page
    router.push('edit-profile');
  };

  return (
    <div className="lg:min-h-screen flex  w-full bg-none lg:bg-bgwhite bg-hovercta bg-opacity-10">
      {/* Left Div */}
      <div className="min-h-screen mt-5 lg:mt-0 lg:h-full lg:min-h-[88vh] pb-10 flex-1 flex justify-center items-center">
        {/* Sign Up Form Div */}
        <div className="bg-white min-w-[23rem] border-[1px] -translate-y-5 md:-translate-y-0 px-8 md:w-[65%] mt-5 md:mt-14 lg:mt-5 p-5 md:px-20 shadow-xl rounded-xl pb-10">
          {/* Title */}
          <h1 className="text-ink bg-gradient-to-r from-cta to-hovercta bg-clip-text text-transparent font-bold text-2xl mt-5 text-center">
            Sign Up
          </h1>

          {/* Name Input field */}
          <div className="mt-8 px-2">
            <p className="font-medium">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={'Enter your Name'}
            />
            {error.name == 1 && (
              <ErrorStatement text={'Please enter your name.'} />
            )}
            {error.name == 2 && (
              <ErrorStatement text={'Please enter a valid username.'} />
            )}
          </div>

          {/* Email Input field */}
          <div className="mt-8 px-2">
            <p className="font-medium">Email</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'Enter your email'}
            />
            {error.email == 1 && (
              <ErrorStatement text={'Please enter your email.'} />
            )}
            {error.email == 2 && (
              <ErrorStatement text={'Please enter a valid email address.'} />
            )}
          </div>

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

          {/* Gender Input field */}
          <div className="mt-8 px-2">
            <p className="font-medium">Gender</p>
            <Select
              onValueChange={(selectedGender) => setGender(selectedGender)}
            >
              <SelectTrigger className="w-full border-none mt-3">
                <SelectValue placeholder="Select your Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {error.gender == 1 && (
              <ErrorStatement text={'Please select your gender.'} />
            )}
          </div>

          {/* Description Input field */}
          <div className="mt-8 px-2">
            <p className="font-medium">Description</p>
            <TextArea
              value={username}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'Enter your description'}
            />
          </div>

          {/* Input for date of birth */}
          <div className="mt-8 px-2">
            <p className="font-medium">Date Of Birth</p>
            <input
              value={dateOfBirth}
              type="date"
              className="w-full border-b-2 mt-3"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {error.date == 1 && (
              <ErrorStatement text={'Please select your date of birth.'} />
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
        </div>
      </div>

      {/* Image Div - displayed only on laptop */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725973140/signup_dbhrkw.svg"
          className="max-w-[70%] pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Signup;
