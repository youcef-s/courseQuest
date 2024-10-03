import dynamic from 'next/dynamic';
import React from 'react';
const SignIn = dynamic(() => import('../components/main/signin'), { ssr: false })

const SignInPage: React.FC = () => {
  return (
    <SignIn />
  )
}
export default SignInPage;
