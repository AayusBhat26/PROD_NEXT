"use client";
import Image from "next/image";
import {
      useParams, useRouter
} from "next/navigation";

import { cn } from "@/lib/utils";

import { ActionTooltip } from "../actions-tooltip";


interface NavigationItemProps{
      id:string;
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
           
           <ActionTooltip side="top" align="end" label={name}>
                  <div className="flex flex-col ">
                        <button onClick={onClick} className="group relative   items-center"> 
                              <div className={cn("absolute bottom-0  bg-primary rounded-r-full transition-all w-[4px]", params?.serverId !== id && "group-hover:h-[20px]", params?.serverId === id ? "h-[36px]":"h-[8px]")}/>
                              <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden", params?.serverId===id && "bg-primary/10 text-primary rounded-[16px]")}>
                                    <div className="w-full h-[inherit]">
                                          <Image fill src={imageUrl} alt="HUB NAME" />
                                    </div>
                                    
                              </div>
                              
                        </button>
                  </div>
           </ActionTooltip>
      )
}