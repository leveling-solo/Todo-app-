import React, { ReactNode } from "react";
import { LoginData } from "@/app/actions";
import "@/app/globals.css";
export default function LoginFrom(): ReactNode {
  return (
    <div className="mt-3 oauth ">
      <form action={LoginData} className="flex flex-col">
        <button
          type="submit"
          name="action"
          value="google"
          className="border  p-4 m-3 rounded-md bg-[white] text-black font-serif font-bold cursor-pointer hover:bg-[#dcd9d9] oauth"
        >
          Sign In with Google{" "}
        </button>
        <button
          type="submit"
          name="action"
          value="github"
          className="border  p-4 m-3 rounded-md bg-[white] text-black font-serif font-bold cursor-pointer hover:bg-[#dcd9d9] oauth"
        >
          Sign In with Github
        </button>
      </form>
    </div>
  );
}
