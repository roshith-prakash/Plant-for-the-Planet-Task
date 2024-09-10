import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    axios.get('api/hello').then((res) => console.log(res?.data));
  }, []);

  return (
    <>
      <p>Index</p>
    </>
  );
}
