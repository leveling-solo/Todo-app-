"use client";
import React, { ChangeEvent, ReactElement, useState } from "react";
import "./dashboard.modules.css";
import "@/app/globals.css";

import { FaPlus } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
export default function Todo({
  setTodo,
  todo,
  submit,
}: {
  setTodo: any;
  todo: any;
  submit: any;
}): ReactElement {
  const handleChange: any = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      text: event.target.value,
    });
  };
  return (
    <div className=" filter-effect w-100%  mb-3 rounded-md">
      <form onSubmit={submit} className="w-full">
        <div className="flex w-full items-center text-[1.42rem] ml-2 ">
          <FaPlus className="opacity-40" />
          <div>
            <input
              type="text"
              className="w-[65rem] p-2 bg-transparent  outline-none form placeholder:text-[blue]"
              name="text"
              value={todo?.text}
              onChange={handleChange}
              placeholder="Add Tasks"
            />
          </div>
          {todo.text === "" ? (
            ""
          ) : (
            <div>
              <div className="flex text-[1.3rem] items-center task cursor-pointer">
                <IoHome className="mr-1" />
                <button>Tasks</button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
