import ErrorStatement from '@/components/ErrorStatement';
import Input from '@/components/Input';
import CTAButton from '@/components/CTAButton';
import TextArea from '@/components/TextArea';
import { useEffect, useState } from 'react';
import { SignupError } from '@/types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isValidEmail, isValidUsername } from '@/utils/validation';
import toast from 'react-hot-toast';
import { GiPineTree } from 'react-icons/gi';
import { useDBUser } from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import RingLoader from 'react-spinners/RingLoader';

const EditProfile = () => {
  const router = useRouter();
  // Context to store user data from DB (on sign in)
  const context = useDBUser();
  // State to store the name
  const [name, setName] = useState<string | undefined>(undefined);
  // State to store the email
  const [email, setEmail] = useState<string | undefined>(undefined);
  // State to store the username
  const [username, setUsername] = useState<string | undefined>(undefined);
  // State to store the gender
  const [gender, setGender] = useState<string | undefined>(undefined);
  // State to store the description
  const [description, setDescription] = useState<string | undefined>(undefined);
  // State to store Date of Birth
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>(undefined);
  // To disable button
  const [disabled, setDisabled] = useState<boolean>(false);
  // For loading screen
  const [loading, setLoading] = useState<boolean>(true);
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

    // Check if Name is entered
    if (name == undefined || name.length <= 0) {
      setError((prev) => ({ ...prev, name: 1 }));
      return;
    }

    // Check if name is shorter than 3 characters
    if (name.length < 3) {
      setError((prev) => ({ ...prev, name: 2 }));
      return;
    }

    // Check if name is longer than 20 characters
    if (name.length > 20) {
      setError((prev) => ({ ...prev, name: 3 }));
      return;
    }

    // Check if Email is entered
    if (email == undefined || email.length <= 0) {
      setError((prev) => ({ ...prev, email: 1 }));
      return;
    }

    // Check if email is a valid email
    if (!isValidEmail(email)) {
      setError((prev) => ({ ...prev, email: 2 }));
      return;
    }

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

    // Check if Gender is selected
    if (gender == undefined) {
      setError((prev) => ({ ...prev, gender: 1 }));
      return;
    }

    // Check if Date is entered
    if (!dateOfBirth) {
      setError((prev) => ({ ...prev, date: 1 }));
      return;
    }

    if (new Date() < new Date(dateOfBirth)) {
      setError((prev) => ({ ...prev, date: 2 }));
      return;
    }

    // Disable button
    setDisabled(true);

    // Call the Edit profile API to accept user's changes
    axios
      .post('/api/editProfile', {
        user: {
          name,
          gender,
          dateOfBirth,
          description,
          email,
          username,
        },
      })
      .then(() => {
        // Refetch user object
        context?.refetch();
        // Enable button
        setDisabled(false);
        // Toast notification
        toast.success('Profile updated Successfully!');
      })
      .catch((err) => {
        // Enable button
        setDisabled(false);
        console.log(err);
        // Show toast notification for conflict error
        if (err.status == 409) {
          toast.error(err.response.data.message);
        }
      });
  };

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
          router.replace('/login');
          setTimeout(() => {
            setLoading(false);
          }, 2500);
        });
    } else {
      setLoading(false);
    }
  }, [context?.dbUser?.username]);

  // Set the fields with the values in the user context object
  useEffect(() => {
    setDateOfBirth(context?.dbUser?.dateOfBirth);
    setGender(context?.dbUser?.gender);
    setEmail(context?.dbUser?.email);
    setName(context?.dbUser?.name);
    setDescription(context?.dbUser?.description || undefined);
    setUsername(context?.dbUser?.username);
  }, [context?.dbUser]);

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
        <div className="lg:min-h-screen relative flex items-center w-full bg-hovercta bg-opacity-10">
          {/* Main Div */}
          <div className="mt-5  animate__animated animate__fadeInUp overflow-hidden lg:mt-0 lg:h-full lg:min-h-[88vh] pb-10 flex-1 flex justify-center items-center">
            {/* Profile Edit Div */}
            <div className="bg-white min-w-[23rem] w-[80%] border-[1px] -translate-y-5 md:-translate-y-0 px-8 md:w-[65%] mt-5 md:mt-14 lg:mt-5 p-5 md:px-16 shadow-xl rounded-xl pb-10">
              {/* Title */}
              <h1 className="flex justify-center items-center gap-x-2 text-textcta font-bold text-2xl mt-5 text-center">
                <GiPineTree className="text-textcta" /> Edit Your Profile
                <GiPineTree className="text-textcta" />
              </h1>

              {/* Name and Email */}
              <div className="flex flex-wrap gap-x-5 mt-8">
                {/* Name Input field */}
                <div className="w-full lg:flex-1 mt-8 px-2">
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
                    <ErrorStatement
                      text={'Name must be atleast 3 characters long.'}
                    />
                  )}
                  {error.name == 3 && (
                    <ErrorStatement
                      text={'Name can be at max 20 characters long.'}
                    />
                  )}
                </div>

                {/* Email Input field */}
                <div className="w-full lg:flex-1 mt-8 px-2">
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
                    <ErrorStatement
                      text={'Please enter a valid email address.'}
                    />
                  )}
                </div>
              </div>

              {/* Username and Gender */}
              <div className="flex flex-wrap gap-x-5">
                {/* Username Input field */}
                <div className="w-full lg:flex-1 mt-8 px-2">
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

                {/* Gender Input field */}
                <div className="w-full lg:flex-1 mt-8 px-2">
                  <p className="font-medium">Gender</p>
                  <Select
                    value={gender}
                    onValueChange={(selectedGender) =>
                      setGender(selectedGender)
                    }
                  >
                    <SelectTrigger className="w-full border-none mt-3">
                      <SelectValue placeholder="Select your Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {error.gender == 1 && (
                    <ErrorStatement text={'Please select your gender.'} />
                  )}
                </div>
              </div>

              {/* Input for date of birth */}
              <div className="mt-8 px-2">
                <p className="font-medium mb-5">Date Of Birth</p>
                <input
                  value={dateOfBirth}
                  type="date"
                  className="bg-transparent w-full border-b-2 mt-3"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {error.date == 1 && (
                  <ErrorStatement text={'Please select your date of birth.'} />
                )}

                {error.date == 2 && (
                  <ErrorStatement
                    text={'Date of birth cannot be ahead of current date.'}
                  />
                )}
              </div>

              {/* Description Input field */}
              <div className="mt-8 px-2">
                <p className="font-medium">Description</p>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={'Enter your description'}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-16">
                <CTAButton
                  onClick={submit}
                  className="w-full"
                  disabled={disabled}
                  disabledText="Please Wait..."
                  text={'Update Profile'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
