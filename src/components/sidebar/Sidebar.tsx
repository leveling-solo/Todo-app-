"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProfileMangaer from "./profile_mangaer";
import Profile from "./profile";

import "@/app/globals.css";
// icons
import { IoMdSunny } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { PiInfinityBold } from "react-icons/pi";

export default function Sidebar() {
  const pathname: string = usePathname();
  const noSidebarsRoutes: string[] = ["/login", "/signup"];
  const showSider: boolean = !noSidebarsRoutes.includes(pathname);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const [tasks, setTasks] = useState([]);

  async function fetchingData() {
    try {
      const res = await fetch("http://localhost:3000/api/userinfo");
      const data = await res.json();
      setData((prevdata) => {
        return {
          ...prevdata,
          name: data.username,
          email: data.email,
          image: data.image,
        };
      });
    } catch (error: any) {
      throw new Error("something went worng from client side", error.message);
    }
  }
  useEffect(() => {
    fetchingData();
  }, []);

  useEffect((): (() => void) => {
    const profile: Element | null = document.querySelector(".profile");

    const handleClick: () => void = (): void => {
      setShow((prev: boolean): boolean => !prev);
    };

    if (profile) {
      profile.addEventListener("click", handleClick);
    }

    return (): void => {
      if (profile) {
        profile.removeEventListener("click", handleClick);
      }
    };
  }, []);

  async function getAllTasks() {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      setTasks(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="bg-[#2c2727] h-screen w-[110%]">
      {showSider && (
        <div className="">
          <div className="relative">
            <div className="profile">
              <Profile data={data} />
            </div>
            {show && <ProfileMangaer data={data} setshow={setShow} />}
          </div>

          <Link
            href="/"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex  items-center">
              <IoMdSunny className="mr-5 text-[aqua]" />
              <p>My Day</p>
            </div>
          </Link>

          <Link
            href="/important"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex  items-center">
              <IoMdStarOutline className="mr-5 text-[yellow] text-[1.3rem]]" />
              <p>Important</p>
            </div>
          </Link>
          <Link
            href="/planned"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex items-center">
              <BsLayoutTextWindowReverse className="mr-5 text-[aqua]" />
              <p>Planned</p>
            </div>
          </Link>

          <Link
            href="/complete"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex items-center">
              <FaRegCheckCircle className="mr-5 text-[lightgreen]" />
              <p>Completed</p>
            </div>
          </Link>
          <Link
            href="/all"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex items-center">
              <PiInfinityBold className="mr-5 text-[red]" />
              <p>All</p>
            </div>
          </Link>
          <Link
            href="/task"
            className="hover:bg-[grey] hover:text-[black] sidenavText flex rounded-[5px] m-2 items-center border mt-4 p-2 justify-between"
          >
            <div className="flex  items-center">
              <IoIosHome className="mr-5 text-[orange]" />
              <p>Task</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
