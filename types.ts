import { Member, Profile, Server } from "@prisma/client"

export type HubWithMembersWithProfiles = Server &{
      members: (Member & {profile: Profile})[];
}