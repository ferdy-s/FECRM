"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { usePathname } from "next/navigation";

import { sidebarSections } from "@/constants/sidebar";
import { useRole } from "@/hooks/use-role";
import { Badge } from "@/components/ui/badge";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {

  const role = useRole();

  const user = useAuthStore(
  (state) => state.user
);

  const pathname =
    usePathname();

  if (!role) {
    return null;
  }

  const sections =
    sidebarSections
      .map((section) => ({
        ...section,

        items:
          section.items.filter(
            (item) =>
              item.roles.includes(
                role
              )
          ),
      }))
      .filter(
        (section) =>
          section.items.length > 0
      );

  return (
   <Sidebar

  variant="sidebar"

  collapsible="icon"

  className="
    border-r
    bg-background
  "

>

     <SidebarHeader
  className="
    border-b
    px-4
    py-5
  "
>

  <div
    className="
      flex
      items-center
      justify-between
    "
  >

    <div
      className="
        min-w-0
      "
    >

      <h1
        className="
          truncate
          text-xl
          font-bold
          tracking-tight
        "
      >
        FECRM
      </h1>

      <p
        className="
          truncate
          text-xs
          text-muted-foreground
        "
      >
        Future Enterprise CRM
      </p>

    </div>

    <span
      className="
        rounded-full
        bg-green-600
        px-2
        py-1
        text-[10px]
        font-semibold
        text-white
      "
    >
      Online
    </span>

  </div>

</SidebarHeader>

     <SidebarContent
  className="
    overflow-y-auto
    px-2
    py-2
  "
>

        {sections.map(
          (section) => (
            <SidebarGroup
              key={section.title}
            >
              <SidebarGroupLabel>
                {section.title}
              </SidebarGroupLabel>

              <SidebarGroupContent>

                <SidebarMenu>

                  {section.items.map(
                    (item) => {

                      const Icon =
                        item.icon;

                      const isActive =
                        pathname ===
                          item.href ||
                        pathname.startsWith(
                          `${item.href}/`
                        );

                      return (
                        <SidebarMenuItem
                          key={item.href}
                        >
                         <SidebarMenuButton

  asChild

  isActive={isActive}

  tooltip={item.title}

  className="

    h-11

    rounded-lg

    transition-all

    duration-200

    hover:bg-accent

    hover:text-accent-foreground

    data-[active=true]:bg-primary

    data-[active=true]:font-semibold

    data-[active=true]:text-primary-foreground

  "

>
                            <Link
                              href={
                                item.href
                              }
                            >
                             <Icon

  className="
    h-5
    w-5
    shrink-0
  "

/>

                             <span

  className="
    truncate
  "

>
                                {item.title}
                              </span>

                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                  )}

                </SidebarMenu>

              </SidebarGroupContent>
            </SidebarGroup>
          )
        )}

      </SidebarContent>

     <SidebarFooter
  className="
    border-t
    p-4
  "
>

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-primary
        text-sm
        font-semibold
        text-primary-foreground
      "
    >

      {

        role

          .charAt(0)

          .toUpperCase()

      }

    </div>

  <div className="min-w-0 space-y-0.5">

  <p className="truncate text-sm font-semibold">
    {user?.name ?? "-"}
  </p>

  <div className="flex items-center gap-2">

    <Badge
      variant="secondary"
      className="h-5 rounded-md px-2 text-[10px]"
    >
      {user?.role}
    </Badge>

  </div>

</div>

  </div>

</SidebarFooter>

    </Sidebar>
  );
}