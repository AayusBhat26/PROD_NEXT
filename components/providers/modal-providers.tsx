"use client";

import { useEffect, useState } from "react";
import { CreateHubModal } from "../modals/create-hub-modal";
export const ModalProvider = ()=>
{
      const [isMounted, setIsMounted] = useState(false);
      useEffect(()=>{
            setIsMounted(true);
      }, [])
      return (
            <>
            <CreateHubModal />
            </>
      )
}