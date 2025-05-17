import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AddForm from "./AddForm"
import { InteractiveGridPattern, InteractiveGridPatternDemo } from "./mage-ui/background/InteractiveGridPattern"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <InteractiveGridPatternDemo/>
        <header className="flex relative h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-bold text-xl">Employee management system</h1>
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex relative flex-1 flex-col gap-4 p-4 pt-0 w-fit">
            <Outlet/>
        </div>
        {/* </InteractiveGridPatternDemo> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
