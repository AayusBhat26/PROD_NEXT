"use client";

import { HubWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
      HoverCard,
      HoverCardContent,
      HoverCardTrigger,
} from "@/components/ui/hover-card"

interface HubHeaderProps {
      server: HubWithMembersWithProfiles;
      role?: MemberRole;
};

export const HubHeader = ({
      server, role
}: HubHeaderProps) => {
      const isAdmin = role === MemberRole.ADMIN;
      const isModerator = isAdmin || role === MemberRole.MODERATOR;

      return (
      
                  <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none" asChild>
                              <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 borderd-b-2 hover:bg-blue-100 dark:hover:bg-slate-800/50 transition">
                                    {server.name}
                                   

                                          <ChevronDown className=" h-5 w-5 ml-auto" />
                                   
                              </button>


                        </DropdownMenuTrigger>
                        

                              <DropdownMenuContent className="w-56 h-20 flex  justify-center  align-center text-xs font-medium text-black dark:text-neutral-100 space-y-[2px] ">

                                    {
                                          isModerator && (
                                                <DropdownMenuItem className="w-full flex justify-center align-center">
                                                      Invite others.
                                                </DropdownMenuItem>
                                          )
                                    }
                              </DropdownMenuContent>

                  </DropdownMenu>

      )
}