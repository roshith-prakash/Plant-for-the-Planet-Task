import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

// Type of user object returned from API
type UserData = {
  name: string;
  dateOfBirth: string;
  username: string;
  gender: string;
  email: string;
  description: string | null;
};

// Creating Context
const UserContext = createContext<{
  dbUser: UserData;
  setDbUser: Dispatch<SetStateAction<UserData>>;
  refetch: () => void;
}>({
  dbUser: {
    email: '',
    username: '',
    name: '',
    gender: '',
    description: null,
    dateOfBirth: '',
  },
  setDbUser: () => {
    return {
      email: '',
      username: '',
      name: '',
      gender: '',
      description: null,
      dateOfBirth: '',
    };
  },
  refetch: () => {},
});

// Hook to consume the context
export function useDBUser() {
  if (UserContext) {
    return useContext(UserContext);
  }
}

// UserProvider Component that provides the dbUser context to all its children
export function UserProvider({ children }: { children: React.ReactNode }) {
  // State to store user object - default values present
  const [dbUser, setDbUser] = useState<UserData>({
    email: '',
    username: '',
    name: '',
    gender: '',
    description: null,
    dateOfBirth: '',
  });

  // UseQuery to query the user object on page load
  const { data, refetch } = useQuery({
    queryKey: ['dbUser'],
    queryFn: async () => {
      return axios.get('/api/getUser');
    },
    staleTime: Infinity,
  });

  // If user object is returned from API, set it in state
  useEffect(() => {
    if (data?.data?.user) {
      setDbUser(data?.data?.user);
    }
  }, [data?.data]);

  // Value object to be passed in context
  const value = {
    dbUser,
    setDbUser,
    refetch,
  };

  return (
    // Context Provider
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}
