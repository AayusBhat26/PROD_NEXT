// import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col">

      <p className='text-3xl font-bold'>
        <UserButton afterSignOutUrl="/"/>
      </p>
      <ModeToggle/>
    </div>
  )
}
// i've used app router in next js 14
// our page.tsx is equivalent to localhost:3000/, therefore we have no need to create new routes 
// if we want to create a new route, we can simple create a new folder inside the app folder, once the ne folder is created, we need to create a new file i.e. page.tsx so that it would display once someone hits the localhost:3000/test
// here test is the folder that i've created inside the app folder.

// we can also create organizational folders, these folders are nothing but normal folders which have no effect on the routes.
// we can create one by entering the name of the folder inside the parathensis
//  "()"

// inside the organization folders, we can create route folders too, which will directly affect the routes. 
// for example, we can create an auth organizational folder, inside that we can create login and signup route folders.

// what is the need of the organization folders?
// we can use organizational folders in 2 ways
// 1) in order to keep all the similar routes in a single folder 
// 2) we can give same or similar layouts to all the pages which are directly affecting the routes.
// in order to acheive the 2nd, we have to create a new file outside all the route folders and inside the organizational folder, that file will be named as layout.tsx

// to mount any providers, we mount the same inside route layout.