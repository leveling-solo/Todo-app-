"use client";
import Image from "next/image";
import React, { ReactElement } from "react";
import "./Sidebar.modules.css";
export default function Profile({ data }: { data: any }): ReactElement {
  return (
    <div className=" cursor-pointer  flex   p-3 items-center ">
      <Image
        src={data.image === "" ? "Loading..." : data.image}
        alt="email id"
        width={60}
        height={60}
        className="rounded-full mr-4 sm:h-[50px] sm:w-[50px]"
      />
      <div>
        <h5 className="text-[15px] font-bold capitalize sm:text-[13px] lg:text-[20px]  name">
          {!data.name ? "Loading..." : data.name}
        </h5>
        <p className="text-[15px] sm:text-[13px] lg:text-[16px] name ">
          {!data.email ? "Loading..." : data.email}
        </p>
      </div>
    </div>
  );
}
