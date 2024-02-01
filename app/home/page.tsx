"use client"
import { redirect } from "next/navigation";
const Home = () => {
      const change = ()=>(  (redirect("/sign-in")))
      return (  <div className="text-white">
      {/* THIS IS HOME PAGE FOR THE WORKIFY  */}
      {/* <button className="" onClick={change()}> go to login</button> */}
      </div>);
}
 
export default Home;