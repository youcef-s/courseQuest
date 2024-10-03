import dynamic from 'next/dynamic';
import React from 'react';
const SignUp = dynamic(() => import('../components/main/signup'), { ssr: false })

const SignUpPage: React.FC = () => {
  return (
    <SignUp />
  );
};

export default SignUpPage;
