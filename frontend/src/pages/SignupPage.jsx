import React from "react";
import Signup from "../components/Signup";

export default () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=898&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Recipify
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Join us today and savor the perfect blend of recipes and shopping.
              Sign up now to unlock a world of culinary delights and exclusive
              deals!
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl text-center">
                Welcome to Recipify
              </h2>

              <p className="mt-4 leading-relaxed text-gray-500 text-center">
                Join us today and savor the perfect blend of recipes and
                shopping. Sign up now to unlock a world of culinary delights and
                exclusive deals!
              </p>
            </div>
            <Signup></Signup>
          </div>
        </main>
      </div>
    </section>
  );
};
