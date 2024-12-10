"use client";
import { ReactElement, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { PiDotsThreeOutline } from "react-icons/pi";
import "@/app/globals.css";
import "@/components/planned/dashboard.modules.css";

import ShowTodo from "@/components/planned/showTodo";
import Todo from "@/components/planned/Todo";

import { BsLayoutTextWindowReverse } from "react-icons/bs";

export default function PlannedPage(): ReactElement<Element> {
  const [clicked, setClicked] = useState(false);
  const [parentBgcolor, setParentBgColor] = useState("");
  const [information, setInfo] = useState([]);
  const [todo, setTodo] = useState({
    text: "",
    day: false,
    important: false,
    planned: true,
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
        const newTask = await response.json();
        if (newTask) {
          console.log("Task submitted successfully");
          setTodo({
            text: "",
            day: true,
            important: false,
            planned: true,
            completed: false,
            all: true,
            task: true,
          });
          await getingData();
        } else {
          console.error("Invalid task data received", newTask);
        }
      } else {
        console.error("Failed to submit task");
      }
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
      let filterData = d.data.filter((item: any): any => item.planned);
      setInfo(filterData);
      setAllTasks(filterData);
    } catch (error) {}
  }
  useEffect(() => {
    getingData();
  }, []);

  useEffect(() => {
    const savedBgColor: any = localStorage.getItem("plannedBgcolor");
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
    localStorage.setItem("plannedBgcolor", selectedColor);
  }

  function search(event: any) {
    event?.preventDefault();
    if (searchTerm) {
      const filterdTasks = allTasks.filter((task: any) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setInfo(filterdTasks);
    } else [setInfo(allTasks)];
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
        <div className="flex  items-center">
          <p className="date font text-[1.5rem] font-[500]">
            <BsLayoutTextWindowReverse className="mr-3" />
          </p>
          <h1 className=" date text-[2rem]">Planned</h1>
        </div>

        <div className="flex justify-center items-center ">
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
      <div className="w-full h-full mb-1 overflow-y-scroll">
        <ShowTodo information={information} setInfo={setInfo} />
      </div>
      <div>
        <Todo submit={submit} setTodo={setTodo} todo={todo} />
      </div>
    </div>
  );
}
