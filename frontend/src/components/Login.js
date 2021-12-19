import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const Login = ({ authorized }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [toggle, setToggle] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <button
          className="hover:bg-gray-50 text-color-nav px-3 py-2 rounded-md text-lg font-medium"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => loginWithRedirect()}
        >
          Inloggen
        </button>
      </>
    );
  } else {
    return (
      <div class="relative inline-block text-left z-10">
        <div>
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <div class="flex flex-row items-center">
              <FaUserAlt className="mr-1 text-color-footer text-lg" />
              <p className="text-lg font-medium  px-3 py-2 text-color-footer">
                {" "}
                {user.email}{" "}
              </p>
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
        <div
          className={
            toggle
              ? "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              : "hidden"
          }
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          {authorized && (
            <div class="py-3 px-2 text-lg text-color-footer" role="none">
              <a href="/admin/dashboard"> Dashboard </a>
            </div>
          )}
          <div class="py-3 px-2 text-lg text-color-footer" role="none">
            <button onClick={() => logout()}> Sign out </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
