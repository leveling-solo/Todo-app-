"use client";
import { FaUserCog } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import "@/app/globals.css";
import { signOut } from "next-auth/react";
export default function ProfileMangaer({
  data,
  setshow,
}: {
  data: any;
  setshow: any;
}): ReactElement {
  const [showaccount, setShowAccount] = useState(false);

  useEffect((): (() => void) => {
    const account: Element | null = document.querySelector(".account");

    const handleClick: () => void = (): void => {
      setShowAccount((prev: boolean): boolean => !prev);
      console.log("clicked");
    };

    if (account) {
      account.addEventListener("click", handleClick);
    }

    return (): void => {
      if (account) {
        account.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className=" absolute   w-full h-[5rem] bg-[black] rounded-md ">
      <div className="account flex p-3 items-center  justify-between cursor-pointer hover:bg-[#323131] hover:rounded-md mb-3 w-full mt-3">
        {" "}
        <div className="flex  items-center">
          <FaUserCog className=" text-[1.5rem] mr-2" />
          <p className="text-[1.2rem] mt-1">Manage Accounts</p>
        </div>
        <div
          className="text-[red] text-[1.3rem]"
          onClick={() => setshow(false)}
        >
          <IoIosCloseCircle />
        </div>
      </div>

      {showaccount && (
        <div className="absolute   w-screen flex justify-center items-center ">
          <div className="relative h-[11rem] w-[25rem] filter-effect rounded-md text-black flex flex-col  ">
            <p className="text-center m-3">Manage Account</p>
            <div className="flex  justify-between items-center">
              <div className="flex">
                <Image
                  src={!data.image ? "loading" : data.image}
                  alt="email id"
                  width={60}
                  height={60}
                  className="rounded-full mr-4 ml-3"
                />
                <div className="flex items-start flex-col justify-center">
                  <p className="text-[12px] ">
                    {!data.name ? "loading..." : data.name}
                  </p>
                  <p className="text-[12px] ">
                    {!data.email ? "loading..." : data.email}
                  </p>
                </div>
              </div>
              <button
                className="bg-[red] mr-3 p-3 rounded-md text-white"
                onClick={(): Promise<any> => signOut({ callbackUrl: "/login" })}
              >
                Sign Out
              </button>
            </div>
            <div className="flex justify-end m-4    text-white ">
              <button
                className="p-2 bg-black rounded-md w-[6rem]"
                onClick={() => setShowAccount(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
