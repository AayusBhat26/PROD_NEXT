"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../actions-tooltip";
export const NavigationAction = () => {
      return (
            // <div>
            //       <ActionTooltip side="left" align="center" label="New Hub">
            //             <button className="group flex items-center">
            //                   <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-500 group-hover:bg-[#6809C6]">
            //                         <Plus className="group-hover:text-white transition text-[##6809C6]" size={25} />
            //                   </div>
            //             </button>
            //       </ActionTooltip>
            // </div>
            <div>
                  <ActionTooltip side="left" align="center" label="Create A New Hub">
                        <div className="group flex items-center">
                              <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-500 group-hover:bg-[#6809C6]">
                                    <Plus className="group-hover:text-white transition text-[#6809C6]" size={25} />
                              </div>
                        </div>
                  </ActionTooltip>
            </div>

      )
}