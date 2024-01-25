// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/sIQbBqUrmSorRhRP/scene.splinecode');
"use client"
import Spline from '@splinetool/react-spline';
const AuthLayout = ({ children }: {
      children: React.ReactNode
}) => {
      return (
            <div className="h-full w-full  border-black  flex justify-center items-center bg-slate-100">
                  {children}
            </div>
      )
}
export default AuthLayout;

// children -=> login and signup pages