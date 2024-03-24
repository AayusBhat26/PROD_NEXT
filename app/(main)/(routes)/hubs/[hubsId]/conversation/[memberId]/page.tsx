import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
      params: {
            memberId: string,
            hubsId: string,
      }
}

const MemberIdPage = async ({
      params
}: MemberIdPageProps) => {
      const profile = await currentProfile();
      if (!profile) return redirectToSignIn();
      const currentMember = await db.member.findFirst({
            where: {
                  serverId: params.hubsId, profileId: profile.id
            },
            include: {
                  profile: true
            }
      })
      if (!currentProfile) return redirect('/');
      const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

      if (!conversation) return redirect(`/hubs/${params.hubsId}`)
      const { memberOne, memberTwo } = conversation;
      const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;
      return (
            <div className="flex flex-col h-full bg-white dark:bg-transparent" >

                  <ChatHeader imageUrl={otherMember.profile.imageUrl || ''} name={otherMember.profile.name || ''} hubsId={params.hubsId} type='conversation' />
            </div>
      )
}
export default MemberIdPage;