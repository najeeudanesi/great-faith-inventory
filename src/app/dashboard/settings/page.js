/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";
import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const filePickerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const showSuccessMessage = () => {
    toast.success("success", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };
  const showErrorMessage = () => {
    toast.error("error", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName || "");
        setEmail(user.email || "");
      } else {
        setUser(null);
        setName("");
      }
    });
  }, [auth]);

  const handleProfileImageChange = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setProfileImage(readerEvent.target.result);
    };
  };

  const handlePasswordChange = (e) => {
    // Handle password change logic
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    // Handle name change logic
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    // Handle email change logic
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (oldPassword !== "") {
      try {
        await signInWithEmailAndPassword(auth, email, oldPassword).then(() => {
          updatePassword(user, password).then(() => {
            console.log("password changed");
          });
        });
      } catch (error) {
        showErrorMessage();
        console.error(error);
        setIsLoading(false);
        return;
      }
    }

    try {
      await updateProfile(user, {
        displayName: name,
        email: email,
      });

      await updateImage();
      setIsLoading(false);

      showSuccessMessage();
    } catch (error) {
      setIsLoading(false);

      showErrorMessage();
      console.log(error);
      return;
    }
  };

  const updateImage = async (e) => {
    const docRef = await addDoc(collection(db, "user_images"), {
      email: email,
    });

    const imagRef = ref(storage, `user_images/${docRef.id}/image`);

    if (profileImage) {
      await uploadString(imagRef, profileImage, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imagRef);
          await updateProfile(user, {
            photoURL: downloadURL,
          }).then(() => {
            console.log("image updated successfully");
          });
        }
      );
    }
    setProfileImage(null);
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  grid-cols-12 mt-8 pb-56"
      >
        <div className="items-center col-span-12 mx-auto">
          <div className="flex flex-col gap-1 items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt=""
                className="h-32  w-32 rounded-full object-cover outline outline-4 outline-gray-900"
              />
            ) : (
              <img
                src={user?.photoURL}
                className="h-32  w-32 rounded-full object-cover outline outline-4 outline-gray-900"
                alt=""
              />
            )}
            <span
              className="text-sm text-pink-700 cursor-pointer"
              onClick={() => filePickerRef.current.click()}
            >
              Edit Profile picture
            </span>
          </div>
          <div>
            <input
              type="file"
              id="profileImage"
              className=""
              ref={filePickerRef}
              hidden
              onChange={handleProfileImageChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              User Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-decoration"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div>
            <label htmlFor="name" className="label">
              Display name
            </label>
            <input
              type="text"
              id="name"
              className="input input-decoration"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-decoration"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Old Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-decoration"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-end">
              <button
                type="submit"
                className="primary-button btn-pad flex justify-center"
                disabled={isLoading}
              >
                {isLoading && (
                  <ArrowPathIcon className="animate-spin h-5 w-5" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
