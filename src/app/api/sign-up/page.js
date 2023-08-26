"use client";
import "../../components/auth.css";
import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Google from "../../assets/Google-icon.png";
import {
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

export default function Page() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem(
            "Auth Token",
            user._tokenResponse.refreshToken
          );
          console.log(user);
          navigate.push("/api/dashboard");
        }
      );
    } catch (e) {
      console.error("Error occured: " + e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate.push("/api/dashboard");
      });
    } catch (e) {
      console.error("Error occured: " + e);
    }
  };

  return (
    <div className="centered-div w-full max-w-xs">
      <h1 className="text-4xl text-center font-semibold mb-12">Sign up</h1>

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

      <button className="primary-button btn-pad" onClick={signUp}>
        {" "}
        <div className="flex justify-center">
          <ArrowRightOnRectangleIcon className="icon" />
          Sign up
        </div>
      </button>
      <div className="flex justify-end mt-4">
        <div>
          {"Already have an account "}{" "}
          <a href="/" className="ml-4 text-pink-600 font-semibold">
            Sign in
          </a>
        </div>
      </div>
      <button
        className="input input-decoration btn-pad flex justify-center"
        onClick={signInWithGoogle}
      >
        <div className="flex items-center gap-3">
          <Image src={Google} alt="Profile" width={30} height={30}></Image>
          Sign in with Google
        </div>
      </button>
    </div>
  );
}
