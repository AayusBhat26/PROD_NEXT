import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
interface ChannelIdPageProps {
      params: {
            hubsId: string;
            channelId: string;
      }
}
const ChannelIdPage = async ({
      params
}: ChannelIdPageProps) => {
      const profile = await currentProfile();
      if (!profile) return redirectToSignIn();
      const channel = await db.channel.findUnique({
            where: {
                  id: params.channelId
            }
      })
      const member = await db.member.findFirst({
            where: {
                  serverId: params.hubsId, profileId: profile.id
            }
      });
      if (!channel || !member) {
            redirect('/');
      }

      return (
            <div className="  dark:bg-[#31338] flex flex-col h-full">
                  {/* {ml - [170px] mr-[73px] border border-red-10 p-[8px] md:ml-[0px] md:mr-[0px] md:p-[0px] md:border-none} */}
                  <ChatHeader
                        name={channel.name}
                        hubsId={channel.serverId}
                        type="channel"
                  />
            </div>
      );
}
export default ChannelIdPage;