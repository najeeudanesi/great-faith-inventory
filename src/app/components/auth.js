/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./auth.css";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRecoilState, atom } from "recoil";
import userState from "../../../atoms/atom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  const showErrorMessage = () => {
    toast.error("Invalid login credentials", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };
  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          const loggedInUser = {
            email: user.email,
            uid: user.uid,
          };

          setUser(loggedInUser);
        }
      );
      navigate.push("/dashboard");
    } catch (e) {
      showErrorMessage();
      console.error("Error occured: " + e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate.push("/dashboard");
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <div>
      <ToastContainer />
      <div className="centered-div w-full max-w-xs">
        <h1 className="text-4xl text-center font-semibold mb-12">Sign in</h1>

        <div className="flex font-semibold">
          {" "}
          <AtSymbolIcon className="icon" />
          <span>E-mail</span>
        </div>

        <input
          className=" input input-decoration mb-12"
          type="text"
          placeholder="john@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex font-semibold">
          {" "}
          <LockClosedIcon className="icon" />
          <span>Password</span>
        </div>
        <input
          className="input input-decoration mb-24"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="primary-button btn-pad"
          onClick={signIn}
          disabled={isLoading}
        >
          <div className="flex justify-center">
            {isLoading ? (
              <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
            ) : (
              <ArrowRightOnRectangleIcon className="icon" />
            )}
            Sign in
          </div>
        </button>
      </div>
    </div>
  );
};
