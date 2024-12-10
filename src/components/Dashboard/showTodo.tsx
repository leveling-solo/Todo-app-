"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { FormatDate } from "../time";
import "@/app/globals.css";

// icons
import { FaRegCircle } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoCloseCircleOutline, IoClose } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
export default function ShowTodo({
  setInfo,
  information,
}: {
  setInfo: any;
  information: any;
}): ReactElement {
  const [showEdit, setShowEdit] = useState(null);

  const [dayTaskUpdatingData, setDayTaskUpdatingData] = useState({
    id: "",
    important: false,
    completed: false,
    day: false,
    task: false,
    all: false,
  });
  let [Edit, setEdit] = useState({
    text: "",
  });

  async function handleImportantClick(event: any) {
    try {
      const target = event.target.closest(".star");
      if (target) {
        const taskId = target.getAttribute("data-task-id");
        const task = information.find(
          (item: any): boolean => item._id === taskId
        );
        const updateImportant: boolean = !task.important;

        const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            important: updateImportant,
            _id: taskId,
          }),
        });

        if (res.ok) {
          setDayTaskUpdatingData((prev: any) => ({
            ...prev,
            id: taskId,
            important: updateImportant,
          }));
          setInfo((previnfo: any) =>
            previnfo.map((item: any) =>
              item._id === taskId
                ? { ...item, important: updateImportant }
                : item
            )
          );
        }
      }
    } catch (error: any) {
      console.error("Error updating task: ", error);
    }
  }

  async function handleCompleteClick(event: any) {
    try {
      const target = event.target.closest(".circle");
      if (target) {
        const taskId = target.getAttribute("data-completeTask-id");
        const task = information.find(
          (item: any): boolean => item._id === taskId
        );
        const updateComplete: boolean = !task.completed;
        const updateDay: boolean = !task.day;
        const updateTask: boolean = !task.task;
        const updateImportant: boolean = !task.important;
        const updateAll: boolean = !task.all;

        const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            completed: updateComplete,
            _id: taskId,
            day: updateDay,
            task: updateTask,
            important: updateImportant,
            all: updateAll,
          }),
        });

        if (res.ok) {
          setDayTaskUpdatingData((prev: any) => ({
            ...prev,
            id: taskId,
            completed: updateComplete,
            day: updateDay,
            task: updateTask,
            important: updateImportant,
            all: updateAll,
          }));
          setInfo((previnfo: any) =>
            previnfo.map((item: any) =>
              item._id === taskId
                ? {
                    ...item,
                    completed: updateComplete,
                    day: updateDay,
                    task: updateTask,
                    important: updateImportant,
                    all: updateAll,
                  }
                : item
            )
          );
        }
      }
    } catch (error: any) {
      console.error("Error updating task: ", error);
    }
  }

  function OpenOption(item: any) {
    setEdit({ text: item.text });
    setShowEdit(item._id);
  }

  function handleTextareaChange(e: any): void {
    setEdit({ ...Edit, text: e.target.value });
  }

  async function EditUpdate(item: any) {
    const taskId = item._id;
    try {
      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: taskId, text: Edit.text }),
      });

      if (res.ok) {
        setInfo((previnfo: any) =>
          previnfo.map((item: any) =>
            item._id === taskId
              ? {
                  ...item,
                  text: Edit.text,
                }
              : item
          )
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function RemoveDay(item: any) {
    try {
      const taskId = item._id;

      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: taskId, day: false }),
      });
      if (res.ok) {
        const updateTask = await res.json();
        if (updateTask.success) {
          setInfo((previnfo: any) =>
            previnfo.map((item: any) =>
              item._id === taskId
                ? {
                    ...item,
                    day: false,
                  }
                : item
            )
          );
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function AddDay(item: any) {
    try {
      const taskId = item._id;
      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: taskId, day: true }),
      });

      if (res.ok) {
        const updateTask = await res.json();
        if (updateTask.success) {
          setInfo((previnfo: any) =>
            previnfo.map((item: any) =>
              item._id === taskId
                ? {
                    ...item,
                    day: true,
                  }
                : item
            )
          );
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function DeleteTasks(item: any) {
    try {
      const userId: string = item.user;
      const taskId: string = item._id;
      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: taskId, user: userId }),
      });
      const data: any = await res.json();
      if (res.ok) {
        console.log(data.message);
        if (data.success) {
          setInfo((prevInfo: any) =>
            prevInfo.filter((task: any) => task._id !== taskId)
          );
        }
      }
    } catch (error: any) {
      console.error("Failed to delete task", error.message);
    }
  }

  return (
    <div>
      {information.map(
        (item: any, index: number): ReactElement => (
          <div key={index}>
            {item.completed || !item.day || !item ? (
              ""
            ) : (
              <div className="rounded-md  m-2 flex justify-between tasks text-[1.2em]  bg-[#322e2e] text-[#e1d3d3] z-[-9] cursor-pointer ">
                <div className="flex items-center   ">
                  <div
                    className="mr-2 ml-2 circle "
                    data-completeTask-id={item._id}
                    onClick={handleCompleteClick}
                  >
                    {item.completed ? (
                      <FaRegCircleCheck className="text-[#42be42]" />
                    ) : (
                      <FaRegCircle />
                    )}
                  </div>
                  <div
                    className="task_div   p-4   w-[65rem]"
                    div-task-id={item._id}
                    onClick={() => OpenOption(item)}
                  >
                    {item.completed ? (
                      <p className=" line-through">{item.text}</p>
                    ) : (
                      <p> {item?.text}</p>
                    )}
                  </div>
                </div>
                <div
                  className="cursor-pointer star"
                  data-task-id={item._id}
                  onClick={handleImportantClick}
                >
                  {item.important ? (
                    <FaStar className="text-[yellow] mt-4 mr-2" />
                  ) : (
                    <FaRegStar className="mt-4 mr-2" />
                  )}{" "}
                </div>
              </div>
            )}

            <div className="flex  ">
              {showEdit === item._id && (
                <div className="absolute h-full w-[25rem]  z-[100]  right-0 top-0 bg-[#070707] text-[white]">
                  <div className="  flex flex-col justify-between  h-[44rem] editSection ">
                    <div className="flex flex-col  ">
                      <div className="flex justify-between p-2 ">
                        <p className="text-2xl tasks">Edit Page</p>
                        <p>
                          <IoCloseCircleOutline
                            className="text-2xl text-[red]"
                            onClick={() => setShowEdit(null)}
                          />
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <textarea
                          name="text"
                          id="some"
                          value={Edit.text}
                          className=" h-[10rem] rounded-sm outline-none text-white bg-[#322e2e] m-2 p-2"
                          style={{ resize: "none" }}
                          contentEditable={true}
                          onChange={handleTextareaChange}
                        />

                        <div className="hover:bg-[#e94141]  sidenavText flex rounded-[5px] m-2 items-center  mt-4  justify-between bg-[#534646] cursor-pointer  ">
                          <div
                            className="flex  items-center  w-full mr-3 p-2 "
                            onClick={() => AddDay(item)}
                          >
                            <IoMdSunny className="mr-5 text-[aqua]" />
                            <p>Add to My Day</p>
                          </div>

                          {item.day && (
                            <div
                              className=" hover:text-[black] h-[2rem] flex  items-center w-[2rem] pl-2"
                              onClick={() => RemoveDay(item)}
                            >
                              <IoClose />{" "}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => EditUpdate(item)}
                          className=" p-2 rounded-[30px] w-[10rem] bg-[#5b5bbf] mt-5"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex  justify-between items-center border-t-2 border-[#444242] p-4">
                        <p className="ml-2 Edit-date">
                          created on {FormatDate(new Date(item.createdAt))}
                        </p>
                        <p
                          className="text-[red] mr-2 cursor-pointer"
                          onClick={() => DeleteTasks(item)}
                        >
                          <FaTrashAlt />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
