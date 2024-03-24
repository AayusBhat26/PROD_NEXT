'use client';

import { Member, Profile, MemberRole } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../actions-tooltip";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";


const roleIconMap = {
      "GUEST": null,
      "MODERATOR": <ShieldCheck className="w-4 h-4 ml-2 text-indigo-400" />,
      "ADMIN": <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
}
interface ChatItemsProps {
      id: string;
      content: string;
      member: Member & {
            profile: Profile
      };
      timestamp: string;
      fileUrl: string | null;
      deleted: boolean;
      currentMember: Member;
      isUpdated: boolean;
      socketUrl: string;
      socketQuery: Record<string, string>;
}
export const ChatItems = ({ id, content, member, timestamp, fileUrl, deleted, currentMember, isUpdated, socketUrl, socketQuery }: ChatItemsProps) => {
      const fileType = fileUrl?.split('.').pop();
      const isAdmin = currentMember.role === MemberRole.ADMIN;
      const isModerator = currentMember.role === MemberRole.MODERATOR;
      const isOwner = currentMember.id === member.id;
      const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
      const editMessage = !deleted && (isOwner) && !fileUrl
      const isPDF = fileType === 'pdf' && fileUrl;
      const isImage = !isPDF && fileUrl;

      return (
            <div className="relative flex w-full p-4 transition group itens-center hover:bg-black/5">
                  <div className="flex items-start w-full group gap-x-2">
                        <div className="transition cursor-pointer hover:drop-shadow-md">
                              <UserAvatar src={member.profile.imageUrl || ''} />
                        </div>
                        <div className="flex flex-col w-full">
                              <div className="flex items-center gap-x-2">
                                    <div className="flex items-center">
                                          <p className="text-sm font-semibold cursor-pointer hover:underline">
                                                {member.profile.name}
                                          </p>
                                          <ActionTooltip label={member.role}>
                                                {roleIconMap[member.role]}
                                          </ActionTooltip>
                                    </div>
                                    <span className="text-[10px] text-zinc-600 dark:text-blue-300 font-semibold" >
                                          {timestamp}
                                    </span>
                              </div>
                              {isImage && (
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative flex items-center w-48 h-48 mt-2 overflow-hidden border rounded-md aspect-square bg-secondary">
                                          <Image src={fileUrl} alt={content} fill className="object-cover" />
                                    </a>
                              )}
                              {
                                    isPDF && (
                                          <div className="relative flex items-center p-2 mt-2 rounded-md bg-zinc-800">
                                                <FileIcon className="w-10 h-10 fill-purple-400 stroke-transparent" />
                                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-600 dark:text-white hover:underline">
                                                      PDF FILE
                                                </a>
                                          </div>
                                    )
                              }
                        </div>
                  </div>
            </div>
      )
}