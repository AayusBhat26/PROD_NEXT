"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "../hooks/use-chat-query";
import { Loader2, ServerCrashIcon } from "lucide-react";
import { Fragment } from "react";
import { ChatItems } from "./chat-items";
import { format } from "date-fns"
import { useChatSocket } from "../hooks/use-chat";
type MessageWIthMemberWithProfile = Message & {
      member: Member & {
            profile: Profile
      }
}
interface ChatMessagesProps {
      name: string;
      member: Member;
      chatId: string;
      fileUrl: string;
      apiUrl: string;
      socketUrl: string;
      socketQuery: Record<string, string>;
      paramKey: "channelId" | "conversationId";
      paramValue: string;
      type: 'channel' | 'conversation';
}
const dateFormat = "d MMM yyyy, HH:mm"
export const ChatMessages = ({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, type, paramValue }: ChatMessagesProps) => {

      const queryKey = `chat:${chatId}`
      const addKey = `chat:${chatId}"messages`;
      const updateKey = `chat:${chatId}"messages:update`;
      const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } = useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue
      });
      useChatSocket({ queryKey, addKey, updateKey });
      if (status === 'pending') {
            return (
                  <div className="flex flex-col items-center justify-center flex-1">
                        <Loader2 className="my-4 text-blue-500 h-7 w-7 animate-spin" />
                        <p className="text-xs text-purple-400 dark:text-purple-500">
                              Loading...
                        </p>
                  </div>
            )
      }
      if (status === 'error') {
            return (
                  <div className="flex flex-col items-center justify-center flex-1">
                        <ServerCrashIcon className="my-4 text-blue-500 h-7 w-7" />
                        <p className="text-xs text-purple-400 dark:text-purple-500">
                              500 - Internal Server Error/s
                        </p>
                  </div>
            )
      }
      return (
            <div className="flex flex-col justify-center flex-1 py-4 overflow-y-auto">
                  {/* <div className="flex-1" /> */}
                  <ChatWelcome
                        type={type}
                        name={name}
                  />
                  <div className="flex flex-col-reverse mt-auto">
                        {
                              data?.pages?.map((group, i) => (
                                    <Fragment key={i}>
                                          {
                                                group.items.map((message: MessageWIthMemberWithProfile) => (
                                                      // <div key={message.id}>
                                                      //       {message.content}
                                                      // </div>
                                                      <ChatItems
                                                            key={message.id}
                                                            id={message.id}
                                                            currentMember={member}
                                                            member={message.member}
                                                            content={message.content}
                                                            fileUrl={message.iamgeUrl}
                                                            deleted={message.deleted}
                                                            timestamp={format(new Date(message.createdAt), dateFormat)}
                                                            isUpdated={message.updatedAt !== message.createdAt}
                                                            socketUrl={socketUrl}
                                                            socketQuery={socketQuery}

                                                      />
                                                ))
                                          }
                                    </Fragment>
                              ))
                        }
                  </div>
            </div>
      )
}