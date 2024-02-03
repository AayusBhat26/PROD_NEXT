import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HubIdLayout = async({
      children, 
      params, 
}:{
      children: React.ReactNode;
      params:{hubsId: string};
}) => {
      const profile = await currentProfile();


      if(!profile){
            return redirectToSignIn();
      }

      const server = await db.server.findUnique({
            where:{

                  id:params.hubsId,
                  // above condition will the hub  for that user which is not even the part of the server, this could be done if they knew the hub id
                  members:{
                        // making sure that the user which is searching or trying to get the access to a particular hub is the part of the hub. 
                        some:{
                              profileId: profile.id
                        }
                  }
            }
      });
      // if the hub is delete or not found or the user is not a part of that hub.
      if(!server){
            return redirect("/")
      }
      return ( <div className="h-full ">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 ">
            </div>
            the subHub sidebr
            <main className="h-full md:pl-60">
                  {children}
                  {/* look to apply resizeable shadcn */}
            </main>
            
      </div> );
}
 
export default HubIdLayout  ;