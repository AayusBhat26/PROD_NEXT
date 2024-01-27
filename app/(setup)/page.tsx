import { redirect } from "next/navigation";


// project imports.
import { db } from "@/lib/db";
// import { PrismaClient } from "@prisma/client";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";

// const prisma = new PrismaClient();
const SetupPage = async () => {
      const profile = await initialProfile();
      // console.log(profile)
      
      // finding whether the current profile is the part of any server.
      // todo: using db find a server which user is a part of.

      try {
            const server = await db.server.findFirst({
                  where: {
                        members: {
                              some: {
                                    profileId: profile.id,
                              }
                        }
                  }
            });
            if (server) {
                  return redirect(`/servers/${server.id}`)
            }
      } catch (error) {
            console.log(error);
            
      }

      return <div>
            <UserButton />
             </div>;


}
export default SetupPage;

// this file would work as the main page of this application as the main folder is already being deleted and this exists inside the organizational folder.