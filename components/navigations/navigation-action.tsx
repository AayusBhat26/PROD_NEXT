"use client";

import { Plus, PlusCircle } from "lucide-react";
import { ActionTooltip } from "../actions-tooltip";
import { useModal } from "../hooks/use-modal-store";
export const NavigationAction = () => {
      const {onOpen} = useModal();
      
      return (
            // <div>
                  <ActionTooltip
                        side="right"
                        align="center"
                        label="Add a server"
                  >
                        <button
                              className="group flex items-center"
                              onClick={() => onOpen("createServer")}
                        >
                              <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-balck  group-hover:bg-blue-400">
                                    <PlusCircle
                                          className="group-hover:text-white transition text-purple-600"
                                          size={25}
                                    />
                              </div>
                        </button>
                  </ActionTooltip>
            // </div>

      )
}