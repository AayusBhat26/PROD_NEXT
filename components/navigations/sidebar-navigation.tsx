
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./Navigation-item";
import { ModeToggle } from "../mode-toggle";
import { Servers } from "@/lib/servers";
const TaskbarNavigation = async () => {
      const profile = await currentProfile();
      if (!profile) return redirect('/');

      const servers = await Servers();

      return (
            <div
                  className="space-y-4 flex flex-col items-center h-full text-black dark:text-white w-full dark:bg-[#212329] bg-[#181616] py-2 " >

                  <NavigationAction />
                  <Separator
                        className="h-[2px] bg-blue-400 dark:bg-blue-800 rounded-md w-10 mx-auto"
                  />
                  <ScrollArea className="flex-1 w-full">
                        {servers?.map((server) => (
                              <div key={server.id} className="mb-4">
                                    <NavigationItem
                                          id={server.id}
                                          name={server.name || ''}
                                          imageUrl={server.imageUrl || ''}
                                          createdAt={server.createdAt || ''}
                                    />
                              </div>
                        ))}
                  </ScrollArea>
                  <div className="flex flex-col items-center pb-3 mt-auto gap-y-4 ">
                        <ModeToggle />
                        <UserButton

                              afterSignOutUrl="/"
                              appearance={{
                                    elements: {
                                          avatarBox: "h-[48px] w-[48px]"
                                    }
                              }}
                        />
                  </div>
            </div>
      );
}

export default TaskbarNavigation;