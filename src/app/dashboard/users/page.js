"use client";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";

function page() {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  };

  return (
    <div className="container mx-auto bg-transparent">
      <div className="grid grid-cols-12 mx-16 items-center">
        <div className="col-span-5"></div>
      </div>
    </div>
  );
}

export default page;
