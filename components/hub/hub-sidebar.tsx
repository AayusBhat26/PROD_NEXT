import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { HubHeader } from "./hub-header";
import { ScrollArea } from "../ui/scroll-area";
import { HubSearch } from "./hub-search";
import { AudioLines, Code2, ListTodo, MicIcon, PenTool, ShieldAlertIcon, ShieldCheckIcon, Text, Timer, Video, VideoIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { SubHubSection } from "./sub-hub-section";
import { SubHub } from "./Sub-Hub";
// icon mappings
const iconMapping = {
      [ChannelType.TEXT]: <Text className="mr-2 h-4 w-4" />,
      [ChannelType.AUDIO]: <MicIcon className="mr-2 h-4 w-4" />,
      [ChannelType.VIDEO]: <VideoIcon className="mr-2 h-4 w-4" />,
      [ChannelType.CODE]: <Code2 className="mr-2 h-4 w-4" />,
      [ChannelType.DRAWING]: <PenTool className="mr-2 h-4 w-4" />,
      [ChannelType.TASK]: <ListTodo className="mr-2 h-4 w-4" />,
      [ChannelType.pomofocus]: <Timer className="mr-2 h-4 w-4" />,
};
const roleIconMap = {
      [MemberRole.GUEST]: null,
      [MemberRole.MODERATOR]: <ShieldCheckIcon className="h-4 w-4 mr-2 text-purple-500" />,
      [MemberRole.ADMIN]: <ShieldAlertIcon className="h-4 w-4 mr-2 text-purple-500" />,

};

interface HubSidebarProps {
      hubId: string;
};


export const HubSidebar = async ({
      hubId
}: HubSidebarProps) => {
      const profile = await currentProfile();
      if (!profile) return redirect('/');


      const server = await db.server.findUnique({
            where: {
                  id: hubId,
            },
            include: {
                  channels: {
                        orderBy: {
                              createdAt: "asc",
                        }
                  },
                  members: {
                        include: {
                              // fetching the profile of the channel members. 
                              profile: true
                        },
                        orderBy: {
                              role: "asc"
                        }
                  }
            }
      });
      // text channels
      const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
      const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
      const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
      const codeChannels = server?.channels.filter((channel) => channel.type === ChannelType.CODE);
      const drawingChannels = server?.channels.filter((channel) => channel.type === ChannelType.DRAWING);
      const pomodoroChannels = server?.channels.filter((channel) => channel.type === ChannelType.pomofocus);
      const taskChannels = server?.channels.filter((channel) => channel.type === ChannelType.TASK);

      // all the members of the channel.
      const members = server?.members.filter((member) => member.profileId !== profile.id);

      if (!server) return redirect('/');

      const role = server.members.find((member) => member.profileId === profile.id)?.role;
      return (
            <div className="flex flex-col-reverse h-full  w-full text-primary shadow-md rounded-lg dark:bg-[#19191b] bg-[#F2F3F5]" >
                  <HubHeader server={server} role={role} />

                  <ScrollArea className="flex-1 px-3">
                        <div className="mt-2">
                              <HubSearch
                                    data={[
                                          // 1. text channel
                                          {
                                                label: 'Text Channels',
                                                type: 'Channel',
                                                data: textChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // 2. audio channels
                                          {
                                                label: 'Audio Channels',
                                                type: 'channel',
                                                data: audioChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // 3. video channels
                                          {
                                                label: 'Video Channels',
                                                type: 'channel',
                                                data: videoChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // 4. task channels
                                          {
                                                label: 'Task Channels',
                                                type: 'channel',
                                                data: taskChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // 5. Code channels
                                          {
                                                label: 'Code Channels',
                                                type: 'channel',
                                                data: codeChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // 6. drawing channels
                                          {
                                                label: 'Drawing Channels',
                                                type: 'channel',
                                                data: drawingChannels?.map((channel) => ({
                                                      id: channel.id,
                                                      name: channel.name,
                                                      icon: iconMapping[channel.type]
                                                }))
                                          },
                                          // members
                                          {
                                                label: 'Members',
                                                type: 'member',
                                                data: members?.map((member) => ({
                                                      id: member?.id,
                                                      name: member?.profile?.name,
                                                      icon: roleIconMap[member?.role]
                                                }))
                                          },
                                    ]}
                              />
                        </div>
                        <Separator className="bg-blue-500 dark:bg-purple-600 rounded-md my-2"/>
                        {!!textChannels?.length && <div className="mb-2">
                              <SubHubSection
                              sectionType="channels"
                              channelType={ChannelType.TEXT}
                              role={role}
                              label='Text Sub Hub'
                              />
                              {textChannels.map((channel)=>(
                                    <SubHub 
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                    />
                              ))}
                              </div>} 
                  </ScrollArea>
            </div>
      )
}