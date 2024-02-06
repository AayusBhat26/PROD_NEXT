"use client";
// shadcn imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
// local uploads
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/use-modal-store";
import { Label } from "../ui/label";
import { CheckIcon, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "../hooks/use-origin";
import { useState } from "react";
export const InviteModal = () => {
  const {isOpen, onClose, type, data}= useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type==="invite";
  const {server} = data;
  const [copied, setCopied]= useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`
  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false)
    }, 1000);
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white dark:bg-zinc-950  text-black p-0 overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold dark:text-blue-600 ">
            Invite New Users
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold dark:text-blue-600"> 
            SUB-HUB INVITE LINK
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
            <Input className="bg-zinc-300/500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0" value={inviteUrl}
              />
            <Button size={"icon"} onClick={onCopy} className="hover:bg-blue-600 transition ease-linear">
              {copied ? <CheckIcon className="w-4 h-4" /> : <Copy  className="w-4 h-4" />}
                
              </Button> 
            </div>
            <Button variant={'link'} size={'sm'} className="text-xs text-zinc-500 mt-4 font-extrabold">
              Generate A New SUB-HUB Link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
