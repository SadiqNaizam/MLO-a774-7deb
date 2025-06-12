import React from 'react';

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  // Optional: Add a prop for a logo or brand element
  // logo?: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, title }) => {
  console.log("Rendering AuthPageLayout with title:", title);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Optional: Placeholder for a logo */}
        {/* <img className="mx-auto h-12 w-auto" src="/path-to-your-logo.svg" alt="Workflow" /> */}
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;