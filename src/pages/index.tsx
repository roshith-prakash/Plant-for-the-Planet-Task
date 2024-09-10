import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  useEffect(() => {
    axios.get('api/hello').then((res) => {
      console.log(res?.data);
      toast('Fetched');
    });
  }, []);

  return (
    <>
      <p>Index</p>
    </>
  );
}
