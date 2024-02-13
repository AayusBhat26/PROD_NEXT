"use client";

import { cn } from "@/lib/utils";
import { Channel, MemberRole, Server, ChannelType } from "@prisma/client";
import { Code, Ear, ListTodo, Mic, Pen, PenTool, PlusCircleIcon, Settings2Icon, Text, Timer, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface SubHubProps{
      channel: Channel;
      server: Server;
      role?: MemberRole;
}
const iconMap = {
      [ChannelType.TEXT]: Text,
      [ChannelType.VIDEO]: Video,
      [ChannelType.AUDIO]: Mic,
      [ChannelType.CODE]: Code,
      [ChannelType.DRAWING]: PenTool,
      [ChannelType.pomofocus]: Timer,
      [ChannelType.TASK]: ListTodo,

}
export const SubHub = ({channel , server, role}:SubHubProps)=>{
      const params = useParams();
      const router = useRouter();
      const Icon = iconMap[channel.type];
      return (
            <button
            onClick={()=>{}}
            className={cn(
                  "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-purple-700 dark:hover:bg-[#000000] transition mb-1", 
                  params?.subHubId===channel.id && "bg-purple-700/20 darl:bg-pruple-700"
            )}
            >
             <Icon className="flex-shrink-0 w-5 h-5 text-black dark:text-blue-400"/>    
             <p className={cn("line-clamp-1 font-semibold text-sm text-purple-5 00 group-hover:text-purple-700 dark:text-purple-500 dark:group-hover:text-purple-300 transition", params?.subHubId === channel.id && "text-primary dark:text-purple-200 dark:group-hover:text-white" )}>
                  {channel.name}
            </p> 
            </button>
      )
}