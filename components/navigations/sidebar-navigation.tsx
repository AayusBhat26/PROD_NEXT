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
            <div className="ttext-white flex flex-row-reverse items-end h-full text-primary w-full dark:bg-[#030407] py-3 border-2 border-purple-200 px-2 transition duration-300 ease-in-out hover:bg-purple-600 hover:border-purple-800" suppressHydrationWarning>

                  <NavigationAction />

                  <Separator orientation="vertical" className="w-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md h-10 mb-1 " />

                  <div className="w-full h-full text-red-300 flex ">
                        <div className="pb-3 mt-auto flex  gap-x-4">
                              <ModeToggle />
                              <UserButton afterSignOutUrl="/" appearance={{
                                    elements: {
                                          avatarBox: "h-[48px] w-[48px]"
                                    }
                              }} />
                        </div>
                        <ScrollArea className="w-full ">
                              <div className="w-full  mb-[-20px] flex justify-end">
                                    {
                                          servers.map((server) => (
                                                <div key={server.id} className=" text-white mb-4">
                                                      <NavigationItem
                                                            id={server.id}
                                                            name={server.name || ""}
                                                            imageUrl={server.imageUrl || ""}
                                                      />
                                                </div>
                                          ))
                                    }

                              </div>
                        </ScrollArea>

                  </div>
            </div>
            // <div className="flex flex-col items-center justify-end h-full fixed bottom-0 left-0 right-0 bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
            //       <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            //       <ScrollArea className="flex-1 w-full">
            //             {servers.map((server) => (
            //                   <div key={server.id} className="mb-4">
            //                         <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
            //                   </div>
            //             ))}
            //       </ScrollArea>
            //       <div className="pb-3 flex items-center flex-col gap-y-4">
            //             <ModeToggle />
            //             <UserButton
            //                   afterSignOutUrl="/"
            //                   appearance={{
            //                         elements: {
            //                               avatarBox: "h-[48px] w-[48px]"
            //                         }
            //                   }}
            //             />
            //       </div>
            //       <NavigationAction />
            // </div>
      );
}

export default TaskbarNavigation;