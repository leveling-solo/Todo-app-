import React, { ReactElement } from "react";
import "@/app/globals.css";
import LoginFrom from "@/components/form/loginFromUsingOAth";
export default function Loginpage(): ReactElement<Element> {
  return (
    <div className="flex w-screen  justify-center items-center h-screen ">
      <div className="filter-effect  h-[12rem] w-[26rem] rounded-md flex flex-col  justify-between">
        <LoginFrom />
      </div>
    </div>
  );
}
