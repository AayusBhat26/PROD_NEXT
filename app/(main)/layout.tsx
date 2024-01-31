import TaskbarNavigation from "@/components/navigations/sidebar-navigation";

const MainLayout = async ({children}:{
      children: React.ReactNode;
}) => {
      return (<div className="h-full">
            
            {/* creating the view single hub responsive, forgot to add the code for login and signup */}
            <div className="hidden md:flex h-[72px] z-30 flex-col fixed inset-x-0 bottom-0 ">
                  {/* right-0 inset-y-0*/}
                  <TaskbarNavigation />
            </div>
            <main className="md:pr-[72px] h-full">
                  {children}
            </main>
           
      </div>);
}

export default MainLayout;

// this is the layout page for the single hub.