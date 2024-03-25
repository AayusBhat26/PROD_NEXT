import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db"
export default async function handler(
      req: NextApiRequest,
      res: NextApiResponseServerIo
) {
      if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not supported" })
      }
      try {
            const profile = await currentProfilePages(req);
            const { content, fileUrl } = req.body;
            const { hubsId, channelId } = req.query;
            if (!profile) {
                  return res.status(401).json({
                        error: 'Unauthorized access'
                  })
            }
            if (!hubsId) {
                  return res.status(400).json({ error: 'Hubs ID not found' })
            }
            if (!channelId) {
                  return res.status(400).json({ error: 'channel ID not found' })
            }
            if (!content) {
                  return res.status(400).json({ error: 'content not found' })
            }
            const hub = await db.server.findFirst({
                  where: {
                        id: hubsId as string,
                        members: {
                              some: {
                                    profileId: profile.id
                              }
                        }
                  },
                  include: {
                        members: true
                  }
            })
            if (!hub) {
                  return res.status(404).json({ message: 'hub not foumd' });
            }
            const channel = await db.channel.findFirst({
                  where: {
                        id: channelId as string,
                        serverId: hubsId as string,
                  }
            })
            if (!channel) {
                  return res.status(404).json({ message: 'Channel not found' });
            }
            const member = hub.members.find((member) => member.profileId === profile.id);
            if (!member) {
                  return res.status(404).json({ message: 'member not found' });
            }

            const message = await db.message.create({
                  data: {
                        //todo: to check if the fileurl would be accepted by the imageurl without mentioning it as a string.
                        content, iamgeUrl: fileUrl, channelId: channelId as string,
                        memberId: member.id,
                  },
                  include: {
                        member: {
                              include: {
                                    profile: true
                              }
                        }
                  }
            })
            const channelKey = `chat:${channelId}:messages`;
            res?.socket?.server?.io?.emit(channelKey, message)
            return res.status(200).json(message)
      } catch (error) {
            console.log('[messagees api ]', error)
            return res.status(500).json({ message: "Internal error" })
      }
}