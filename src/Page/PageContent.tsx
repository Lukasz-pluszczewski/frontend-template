import React, { useEffect } from 'react';

function Page() {
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  });

  return <>This is a page</>;
}

export default Page;
