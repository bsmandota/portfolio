import React, { useState } from "react";
import Delete from "../assets/delete-button.png";
import Submit from "../assets/add.png";
let localString = "";
if (localString != null) {
  localString = localStorage.getItem("Task");
}
let localCheck = false;
if (localCheck != null) {
  localCheck = localStorage.getItem("Check");
}
let localDate = "";
if (localDate != null) {
  localDate = localStorage.getItem("Date");
}
function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState(JSON.parse(localString) || []);
  const [string] = useState("[]");
  const [boolean] = useState("[]");
  const [check] = useState(false);
  const [checkList, setCheckList] = useState(JSON.parse(localCheck) || []);
  const [dateList, setDateList] = useState(JSON.parse(localDate) || []);
  let arr = [];
  let newCheckList = [];
  let newDateList = [];
  let newDate = "";
  if (localStorage.getItem("Task") == null) {
    localStorage.setItem("Task", string);
    localStorage.setItem("Check", boolean);
    localStorage.setItem("Date", string);
  }
  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = () => {
    if (todoText.trim() === "") {
      return setTodoText("");
    }
    arr = [...todoList, todoText];
    newDate = Date().slice(0, 21);
    newCheckList = [...checkList, check];
    newDateList = [...dateList, newDate];
    setTodoList(arr);
    console.log(newDateList);
    setCheckList(newCheckList);
    setTodoText("");
    setDateList(newDateList);
    updateLocalStorage();
  };
  const handleRemove = (index) => {
    newCheckList = [...checkList];
    arr = [...todoList];
    newDateList = [...dateList];
    newDateList.splice(index, 1);
    newCheckList.splice(index, 1);
    arr.splice(index, 1);
    setCheckList(newCheckList);
    setTodoList(arr);
    setDateList(newDateList);
    updateLocalStorage();
  };
  const handleCheck = (e, index) => {
    let newCheckList = [...checkList];
    let newCheck = e.target.checked;
    newCheckList.splice(index, 1, newCheck);
    setCheckList(newCheckList);
    localStorage.setItem("Check", JSON.stringify(newCheckList));
  };
  const updateLocalStorage = () => {
    localStorage.setItem("Task", JSON.stringify(arr));
    localStorage.setItem("Check", JSON.stringify(newCheckList));
    localStorage.setItem("Date", JSON.stringify(newDateList));
  };
  let autoFocus = true;
  if (checkList.length > 0) {
    autoFocus = false;
  }
  return (
    <div className="bg-gradient-to-b from-purple-800/80 to-pink-800/80 min-h-screen flex w-screen justify-center text-center">
      <div className="p-2 flex flex-col w-full lg:max-w-5xl">
        <p className="py-3 my-3 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 font-black text-6xl">
          Todo App
        </p>
        <div>
          <div className="flex items-center my-3 p-2 justify-center">
            <input
              type="text"
              className="h-14 w-full text-center placeholder:text-gray-600 placeholder:text-xl placeholder:font-bold text-black bg-purple-300 focus:bg-purple-200 rounded-lg font-bold outline-none duration-300 focus:shadow-md focus:shadow-pink-500 text-xl"
              placeholder="What to do today?"
              value={todoText}
              autoFocus={autoFocus}
              onKeyUp={(e) => {
                e.key == "Enter" && handleSubmit();
              }}
              onChange={(e) => handleChange(e)}
            />
            <div className="flex justify-center items-center">
              <img
                src={Submit}
                onClick={handleSubmit}
                className="ml-4 w-14 h-14 hover:scale-125 hover:-translate-y-1 duration-300"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-full content-center text-center rounded">
          <div className="flex flex-col-reverse w-full content-center text-center rounded relative">
            {todoList.map((task, index) => (
              <div
                className={`${
                  checkList[index] ? "-order-last " : ""
                } relative flex flex-row w-full justify-evenly rounded m-1 delay-500 transition duration-300`}
              >
                <div className="flex justify-center items-center">
                  <input
                    key={index}
                    type="checkbox"
                    checked={checkList[index]}
                    onChange={(e) => handleCheck(e, index)}
                    className={`${
                      checkList[index] &&
                      "focus:hover:-rotate-12 hover:-rotate-12 duration-300 "
                    } h-6 w-6 mx-2 hover:scale-125  accent-purple-600 cursor-pointer`}
                  ></input>
                </div>
                <div
                  key={index}
                  className={`${
                    checkList[index]
                      ? "bg-[#3c096c]/50 italic hover:bg-[#3c096c]/70 text-gray-300 line-through "
                      : "bg-[#3c096c]/80 text-gray-300 hover:bg-[#3c096c] "
                  } capital w-full text-center rounded min-h-12 h-auto p-2 px-4 text-2xl font-semibold text-ellipsis relative break-all container group select-none`}
                >
                  {task}
                  <div className="absolute right-0 top-full z-50 border border-purple-300 bg-purple-900 scale-0 text-white p-1 text-sm delay-200 duration-300 group-hover:scale-75 group-hover:-translate-y-2 rounded-xl">
                    <div className="arrow-up" key={index}></div>
                    Added at {dateList[index]}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={Delete}
                    key={index}
                    className="h-12 w-12 mx-2 hover:scale-125 text-white text-center inline font-semibold duration-300 -translate-y-1 hover:-translate-y-2"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Todo;
