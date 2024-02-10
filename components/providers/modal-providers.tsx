"use client";
import { useEffect, useState } from "react";
import { CreateHubModal } from "../modals/create-hub-modal";
import { InviteModal } from "../modals/invite-modal";
import { EditHubModal } from "../modals/edit-hub-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";


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
            <EditHubModal/>
            <MembersModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
            </>
      )
}