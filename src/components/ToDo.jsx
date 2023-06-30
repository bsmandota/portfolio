import React, { useState } from "react";

let localstring = "";
if (localstring != null || localstring.length<1) {
  localstring = localStorage.getItem("key");
}
let localCheck = false;
if(localCheck != null || localStorage.getItem("Check").length < 1){
  localCheck = localStorage.getItem("Check")
}
function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState(JSON.parse(localstring) || []);
  const [string] = useState("[]");
  const [boolean] = useState("[]")
  const [check, setCheck] = useState(false);
  const [checkList,setCheckList] = useState(JSON.parse(localCheck) || []);
  let arr = [];
  let newList = [];
  if (
    localStorage.getItem("key") == null ||
    localStorage.getItem("key").length < 1
  ) {
    localStorage.setItem("key", string);
    localStorage.setItem("Check",boolean)
  }
  const handleChange = (e) => {
    setTodoText(e.target.value)
  }
  const handleSubmit = () => {
    if (todoText.length !== 0) {
      arr = [...todoList, todoText];
      setTodoList(arr);
      newList = [...checkList,check];
      setCheckList(newList);
      setTodoText("");
      console.log(arr);
      console.log(newList);
      updateLocalStorage();

    } else {
      alert("ABEY SAALE!");
    }
  };
  const handleRemove = (index) => {
    newList = [...checkList];
    arr = [...todoList];
    newList.splice(index,1)
    arr.splice(index,1)
    setCheckList(newList);
    setTodoList(arr);
    updateLocalStorage();
  };
  const handleCheck = (e,index) => {
    let newList = [...checkList];
    let newCheck = e.target.checked
    newList.splice(index,1,newCheck);
    setCheckList(newList)
    localStorage.setItem("Check",JSON.stringify(newList))
  }
  const updateLocalStorage=()=>{
    localStorage.setItem("key", JSON.stringify(arr));
    localStorage.setItem("Check",JSON.stringify(newList))
  
  };
  return (
    <div className="bg-gray-800 min-h-screen flex w-screen text-center ">
      <div className="p-3 flex flex-col w-full" >
        <p className="p-1 text-center font-semibold bold text-5xl text-white ">
          Todo App
        </p>
        <div>
          <div className="flex items-center m-2 justify-center">
            <input
              type="text"
              maxLength={50}
              className="h-12 w-full text-center placeholder:italic placeholder:text-white placeholder:font-bold  bg-blue-900 focus:bg-green-900 rounded-lg caret-white font-bold focus:outline-none focus:placeholder-transparent duration-300"
              placeholder="Write your Task here..."
              value={todoText}
              autoFocus
              onKeyUp={(e)=>{(e.keyCode === 13)&& handleSubmit();
              }}
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={handleSubmit}
              value="Submit"
              className="mx-2 w-28 h-12 rounded-2xl hover:rounded-md bg-green-700 text-white text-center duration-300 inline font-semibold "
            >Submit</button>
          </div>
        </div>
        <div className=" flex flex-col w-full content-center text-center rounded">
          {todoList.map((ele, index) => (
            <div
              className=" flex flex-row justify-evenly rounded m-1 hover:transition duration-300"
            >
                <input
                  key={index}
                  type="checkbox"
                  checked={checkList[index]}
                  onClick={(e)=>handleCheck(e,index)}
                  className="text-3xl rounded h-12 w-12 mx-2 flex accent-blue-600 align-middle decoration-blue-900 group-hover:scale-110 duration-300 z-10 before:bg-red-300"
                ></input>
              <p
                key={index}

                className={`${checkList[index] ? "bg-green-600":"bg-blue-500"}  transform  w-full text-center rounded min-h-12 h-auto px-4 text-3xl font-semibold text-white truncate  group-hover:scale-110 duration-300`}
              >
                {ele}
              </p>
              <button
                key={index}
                className="h-12 w-28 mx-2 rounded-2xl hover:rounded-md bg-red-700 text-white text-center inline font-semibold group-hover:scale-110  duration-500 "
                onClick={() => {
                  handleRemove(index);
                }}
              >Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Todo;