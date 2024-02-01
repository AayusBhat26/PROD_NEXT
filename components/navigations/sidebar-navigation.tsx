import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";



import { currentProfile } from "@/lib/current-profile";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./Navigation-item";
import { ModeToggle } from "../mode-toggle";




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
            <div className="text-white flex flex-row-reverse    items-end h-full text-primary w-full dark:bg-[#22315f] py-3"> 

                  <NavigationAction />

                  <Separator orientation="vertical" className="w-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md h-10 mb-1 " />

                  <div className="w-full text-red-300 flex flex-col">
                        <div className="pb-3 mt-auto flex  gap-y-4">
                              <ModeToggle />
                              <UserButton afterSignOutUrl="/" appearance={{
                                    elements: {
                                          avatarBox: "h-[48px] w-[48px]"
                                    }
                              }} />
                        </div>
                        <ScrollArea className="w-full ">
                              <div className="w-full  mb-[-20px] ">
                                    {
                                          servers.map((server) => (
                                                <div key={server.id} className=" text-white mb-4">
                                                      <NavigationItem
                                                            id={server.id}
                                                            name={server.name}
                                                            imageUrl={server.imageUrl}
                                                      />
                                                </div>
                                          ))
                                    }

                              </div>
                        </ScrollArea>
                        
                  </div>
            </div>
      );
}

export default TaskbarNavigation;