"use client";

import { Plus, PlusCircle } from "lucide-react";
import { ActionTooltip } from "../actions-tooltip";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
export const NavigationAction = () => {
      const { onOpen } = useModal();

      return (
            <div>
                  <ActionTooltip
                        side="right"
                        align="center"
                        label="Add a server"
                  >
                        <button
                              onClick={() => onOpen("createServer")}
                              className="group flex items-center"
                        >
                              <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-gray-700 group-hover:bg-blue-500">
                                    <PlusCircle
                                          className="group-hover:text-white transition text-emerald-500"
                                          size={25}
                                    />
                              </div>
                        </button>
                  </ActionTooltip>
            </div>

      )
}