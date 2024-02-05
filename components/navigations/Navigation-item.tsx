"use client";
import Image from "next/image";
import {
      useParams, useRouter
} from "next/navigation";

import { cn } from "@/lib/utils";

import { ActionTooltip } from "../actions-tooltip";
import {
      HoverCard,
      HoverCardContent,
      HoverCardTrigger,
} from "@/components/ui/hover-card"

interface NavigationItemProps{
      id?:string;
      imageUrl?: string;
      name?:string;
};

export const NavigationItem = ({
      id, imageUrl, name
}:NavigationItemProps) =>{
    
      const params = useParams();
      const router = useRouter();
      const onClick = () => {

            router.push(`/hubs/${id}`)
      }
      
      return (
            <ActionTooltip
                  side="right"
                  align="center"
                  label={name || ""}
            >
                  <button
                        onClick={onClick}
                        className="group relative flex items-center "
                  >
                        <div className={cn(
                              "absolute left-0 bg-blue-400 rounded-r-full transition-all w-[4px]",
                              params?.serverId !== id && "group-hover:h-[50px]",
                              params?.serverId === id ? "h-[36px]" : "h-[22px]", 
                              params?.serverId !== id  && "group-focus:h-[50px]" 
                        )} />
                        <div className={cn(
                              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                              params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                        )}>
                              <HoverCard >
                   <HoverCardTrigger>
                                          <Image
                                                fill
                                                src={imageUrl || ""}
                                                alt="Channel"
                                          />
                   </HoverCardTrigger>
                                    <HoverCardContent className="flex relative mr-[100px] mt-[-100px] w-[200px] h-[200px]">
                                          <Image
                                                fill
                                                src={imageUrl || ""}
                                                alt="Channel"
                                          />
                   </HoverCardContent>
             </HoverCard>

                        </div>
                  </button>
            </ActionTooltip>
            
      )
}