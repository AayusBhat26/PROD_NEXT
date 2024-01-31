import { redirect } from "next/navigation";
import { db } from "@/lib/db";



import { currentProfile } from "@/lib/current-profile";
import { NavigationAction } from "./navigation-action";




const TaskbarNavigation = async () => {
      const profile = await currentProfile();
      if (!profile) return redirect('/');
      const servers = await db.server.findMany({
            where: {
                  members: {
                        some: {
                              profileId: profile.id
                        }
                  }
            }
      });
      return (
            <div className="text-white flex flex-col items-end h-full text-primary w-full dark:bg-[#1E1F22] py-3">
                  
                  <NavigationAction />
            </div>
      );
}

export default TaskbarNavigation;