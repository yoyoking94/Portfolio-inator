import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className='h-screen w-screen flex items-center justify-center border'>
      {children}
    </main>
  );
};

export default Main;
