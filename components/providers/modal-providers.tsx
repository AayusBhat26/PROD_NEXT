"use client";

import { useEffect, useState } from "react";
import { CreateHubModal } from "../modals/create-hub-modal";
import { InviteModal } from "../modals/invite-modal";
export const ModalProvider = ()=>
{
      const [isMounted, setIsMounted] = useState(false);
      useEffect(()=>{
            setIsMounted(true);
      }, [])
      return (
            <>
            <CreateHubModal />
            <InviteModal/>
            </>
      )
}