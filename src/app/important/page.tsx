"use client";
import { ReactElement, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../../components/form/login.modules.css";
import "@/app/globals.css";
import ShowTodo from "@/components/important/showTodo";
import Todo from "@/components/important/Todo";

import { PiDotsThreeOutline } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";

export default function TaskPage(): ReactElement<Element> {
  const [clicked, setClicked] = useState(false);
  const [parentBgcolor, setParentBgColor] = useState("");
  const [important, setImportant] = useState([]);

  const [todo, setTodo] = useState({
    text: "",
    day: false,
    important: true,
    planned: false,
    completed: false,
    all: true,
    task: true,
  });

  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  async function submit(event: any) {
    event?.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (response.ok) {
        console.log("Task submitted successfully");
      } else {
        console.error("Failed to submit task");
      }
      setTodo({
        text: "",
        day: false,
        important: true,
        planned: false,
        completed: false,
        all: true,
        task: true,
      });
      await getingData();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getingData() {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      let d = await res.json();
      let filterData = d.data.filter((item: any): any => item.important);
      setImportant(filterData);
      setAllTasks(filterData);
    } catch (error) {}
  }
  useEffect(() => {
    getingData();
  }, []);

  useEffect(() => {
    const savedBgColor: any = localStorage.getItem("ImportantBgcolor");
    if (savedBgColor) {
      setParentBgColor(savedBgColor);
    }

    let element: Element | null = document.querySelector(".threedot");

    function handleclicked() {
      setClicked((prev: boolean): boolean => !prev);
    }
    element?.addEventListener("click", handleclicked);

    return () => {
      element?.removeEventListener("click", handleclicked);
    };
  }, [clicked]);

  useEffect((): (() => void) => {
    const colorDivs: NodeListOf<Element> =
      document.querySelectorAll(".color-div");

    colorDivs.forEach((div: Element): void => {
      div.addEventListener("click", handleColorClick);
    });

    return (): void => {
      colorDivs.forEach((div: Element): void => {
        div.removeEventListener("click", handleColorClick);
      });
    };
  }, [clicked]);

  function handleColorClick(event: any) {
    const selectedColor: any = event.target.style.backgroundColor;
    setParentBgColor(selectedColor);
    localStorage.setItem("ImportantBgcolor", selectedColor);
  }
  function search(event: any) {
    event?.preventDefault();
    if (searchTerm) {
      const filteredTasks = allTasks.filter((task: any) =>
        task.text.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

      setImportant(filteredTasks);
    } else {
      setImportant(allTasks);
    }
  }

  function handleSearchChange(event: any) {
    setSearchTerm(event.target.value);
  }
  return (
    <div
      className="w-[74rem] h-[43.5rem] mt-8 ml-8 p-4 round flex flex-col   "
      style={{ backgroundColor: parentBgcolor }}
    >
      <div className="flex  justify-between items-center m-2 relative ">
        <div>
          <div className="text-[2rem] flex items-center importantHeading ">
            {" "}
            <FaRegStar className="mr-2" />
            <p>Important</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center p-[7px]  mt-4   rounded-[10px] m-1  bg-[#252222] mb-2 mbr-2">
            <form onSubmit={search} className="flex items-center ">
              <input
                type="text"
                placeholder="search"
                className="w-[95%]  bg-[#252222] outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FaSearch className="w-[5%] cursor-pointer" onClick={search} />
            </form>
          </div>
          <div className="threedot text-[1.5rem] cursor-pointer p-2 border rounded-md ml-4">
            <div>
              <PiDotsThreeOutline />
            </div>
            <div className="absolute right-0 top-[4rem] z-10">
              {clicked && (
                <div className="h-auto w-[20rem] rounded-md bg-[#3b3636]">
                  <div>
                    <p className="theme text-center m-2 p-2">Theme</p>
                  </div>
                  <div className="grid grid-cols-4 gap-3  m-1 p-6  ">
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#de4242" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] bg-[#b1b14c] rounded-md  color-div"
                      style={{ backgroundColor: "#b1b14c" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#593cdb" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#7ad450" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#44d1a7" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#e39132" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#0b5b53" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#4bb3e7" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#15366a" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#521c5e" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#c265ce" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#760a23" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#bb086e" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md  color-div"
                      style={{ backgroundColor: "#e79090" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md bg-[#52843f] color-div"
                      style={{ backgroundColor: "#52843f" }}
                    ></div>
                    <div
                      className="w-[3rem] h-[3rem]  hover:border-[3px] rounded-md bg-[#64563d] color-div"
                      style={{ backgroundColor: "#64563d" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full mb-1 overflow-y-scroll">
        <ShowTodo information={important} setInfo={setImportant} />
      </div>
      <div>
        <Todo submit={submit} setTodo={setTodo} todo={todo} />
      </div>
    </div>
  );
}
