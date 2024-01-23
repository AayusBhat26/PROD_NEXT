// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/sIQbBqUrmSorRhRP/scene.splinecode');
"use client"
import Spline from '@splinetool/react-spline';
const AuthLayout = ({children}:{
      children: React.ReactNode
})=>{
      return (
            // https://prod.spline.design/96IuqLusCbTuYHWj/scene.splinecode
            // https://prod.spline.design/sIQbBqUrmSorRhRP/scene.splinecode mouse
            <div className="h-full flex justify-between items-center bg-white">
                  <Spline scene='https://prod.spline.design/96IuqLusCbTuYHWj/scene.splinecode' />
                  <div>
                        {children}
                  </div>
                  
           
            </div>
      )
}
export default  AuthLayout;

// children -=> login and signup pages