import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { HubHeader } from "./hub-header";

interface HubSidebarProps{
      hubId: string;
}
export const HubSidebar = async({
      hubId
}: HubSidebarProps)=>{
      const profile = await currentProfile();
      if(!profile) return redirect('/');
      

      const server = await db.server.findUnique({
            where:{
                  id: hubId,
            }, 
            include:{
                  channels:{
                        orderBy:{
                              createdAt:"asc", 
                        }
                  }, 
                  members:{
                        include:{
                              // fetching the profile of the channel members. 
                              profile: true
                        }, 
                        orderBy:{
                              role:"asc"
                        }
                  }
            }
      });
      // text channels
      const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
      const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
      const videoChannels = server?.channels.filter((channel)=> channel.type=== ChannelType.VIDEO);

      // all the members of the channel.
      const members = server?.members.filter((member)=>member.profileId!==profile.id);

      if(!server) return redirect('/');

      const role = server.members.find((member)=>member.profileId === profile.id )?.role;
      return (
            <div className="flex flex-col h-full  w-full text-primary shadow-md rounded-lg dark:bg-[#19191b] bg-[#F2F3F5]" >
                  <HubHeader server={server} role={role}/>
            </div>
      )
}