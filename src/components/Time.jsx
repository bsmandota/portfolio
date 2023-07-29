import { useState,useEffect } from "react"
function Time (){
const [time ,setTime] = useState("00:00");
function updateTime(){
    let dt =new Date();
    console.log(dt)
    setTime(dt.toLocaleTimeString().slice(0,7))
}
useEffect(() => {
 setInterval(() => {
    updateTime()
 }, 1000)
}, [])

    return (
        <div className="h-screen flex justify-center items-center">
  <div className="bg h-full w-full absolute z-[-1]"></div>
  <div className="fg h-full w-full absolute z-10"></div>
  <h1 className="font-extrabold h-full w-full absolute flex justify-startitems-center text-blue-700/50 text-center text-[400px] -translate-y-10 overflow-hidden z-0">
    {time}
  </h1>
</div>
    )
}
export default Time