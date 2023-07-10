import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
  // customer details
  const [customerDetails, setCustomerDetails] = useState({});
  // signup error for when it fail
  const [signupError, setSignupError] = useState(false);

  const validateCustomerDetails = (json) => {
    if (json.confirmPassword != json.password) return false;

    return true;
  };

  const submitHandler = (event) => {
    console.log(customerDetails);
    event.preventDefault();

    // check if have all details
    if (!validateCustomerDetails(customerDetails)) {
      setSignupError(false);
      console.log("Fail");
      return;
    }

    // check if email is unique
    const email = customerDetails.email;
    fetch("api/user/getemail/?email=" + email, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json == null) {
          // good, go and create
        } else {
          return alert("Fail to create: email exist");
        }
      })
      .catch((err) => {
        console.log("======failure=======");
        console.log(err);
      });
    console.log("Success");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...customerDetails,
      }),
    };

    fetch("api/user/signup", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log("======success=======");
        console.log(json);
      })
      .catch((err) => {
        console.log("======failure=======");
        console.log(err);
      });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  // input handlers
  const firstnameInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, firstName: event.target.value };
    });
    console.log(customerDetails);
  };
  const lastnameInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, lastName: event.target.value };
    });
    console.log(customerDetails);
  };
  const birthdayInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, dob: event.target.value };
    });
    console.log(customerDetails);
  };
  const emailInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, email: event.target.value };
    });
    console.log(customerDetails);
  };
  const mobileInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, mobile: event.target.value };
    });
    console.log(customerDetails);
  };
  const passwordInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, password: event.target.value };
    });
    console.log(customerDetails);
  };
  const confirmPasswordInputHandler = (event) => {
    setCustomerDetails((prev) => {
      return { ...prev, confirmPassword: event.target.value };
    });
    console.log(customerDetails);
  };

  return (
    <form onSubmit={submitHandler} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-2">
        <label
          htmlFor="FirstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name*
        </label>

        <input
          type="text"
          id="FirstName"
          name="first_name"
          value={customerDetails.firstName}
          onChange={firstnameInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label
          htmlFor="LastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name*
        </label>

        <input
          type="text"
          id="LastName"
          name="last_name"
          value={customerDetails.lastName}
          onChange={lastnameInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700"
        >
          Birthday*
        </label>

        <input
          type="Date"
          id="dob"
          name="dob"
          value={customerDetails.dob}
          onChange={birthdayInputHandler}
          max={currentDate}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-4">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          Email*
        </label>

        <input
          type="email"
          id="Email"
          name="email"
          value={customerDetails.email}
          onChange={emailInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
      <div className="col-span-2">
        <label
          htmlFor="Mobile"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile*
        </label>

        <input
          type="tel"
          id="Mobile"
          name="phone"
          value={customerDetails.mobile}
          onChange={mobileInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          Password*
        </label>

        <input
          type="password"
          id="Password"
          name="password"
          value={customerDetails.password}
          onChange={passwordInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="PasswordConfirmation"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password*
        </label>

        <input
          type="password"
          id="PasswordConfirmation"
          name="password_confirmation"
          value={customerDetails.confirmPassword}
          onChange={confirmPasswordInputHandler}
          className="p-2 border-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our
          <Link to="#" className="mx-1 text-gray-700 underline">
            terms and conditions
          </Link>
          and
          <Link to="#" className="mx-1 text-gray-700 underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          onClick={submitHandler}
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        >
          Create an account
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <Link to="/login" className="mx-1 text-gray-700 underline">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
