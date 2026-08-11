"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Component,
  LayoutTemplate,
  Palette,
  Sparkles,
  PanelsTopLeft,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// inside the same file, replace the interfaces + navGroups

export interface NavItem {
  title: string
  href: string
}

export type NavGroupEntry =
  | {
  type: "group"
  title: string
  icon: LucideIcon
  items: NavItem[]
}
  | {
  type: "link"
  title: string
  icon: LucideIcon
  href: string
}

export const navGroups: NavGroupEntry[] = [
  {
    type: "group",
    title: "Section",
    icon: LayoutTemplate,
    items: [
      { title: "CTA", href: "/section/cta" },
      { title: "Features", href: "/section/feature" },
      { title: "Footer", href: "/section/footer" },
      { title: "Gallery", href: "/section/gallery" },
      { title: "Hero", href: "/section/hero" },
      { title: "Map", href: "/section/map" },
      { title: "Testimonial", href: "/section/testimonial" },
      { title: "Timeline", href: "/section/timeline" },
    ],
  },
  {
    type: "group",
    title: "Element",
    icon: Component,
    items: [{ title: "Carousel", href: "/element/carousel" }],
  },
  {
    type: "link",
    title: "Animation",
    icon: Sparkles,
    href: "/animation",
  },
  {
    type: "link",
    title: "Background",
    icon: Palette,
    href: "/background",
  },
  {
    type: "group",
    title: "Template",
    icon: PanelsTopLeft,
    items: [
      { title: "Landing", href: "/templates/landing" },
      { title: "Dashboard", href: "/templates/dashboard" },
      { title: "Portfolio", href: "/templates/portfolio" },
    ],
  },
]



export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-sidebar"
    >
      <SidebarHeader className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PanelsTopLeft className="h-4 w-4" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">UI Studio</span>
          <span className="text-[11px] text-muted-foreground">Components library</span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup className="px-3">
          <SidebarGroupLabel className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Components
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1">
            {navGroups.map((group) => {
              const active = pathname === group.href

              if (group.type === "link") {
                return (
                  <SidebarMenuItem key={group.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={group.title}
                      isActive={active}
                    >
                      <Link href={group.href} className="flex w-full flex-row items-center gap-2">
                        <group.icon />
                        <span>{group.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              const isGroupActive = group.items.some((item) => item.href === pathname)

              return (
                <Collapsible
                  key={group.title}
                  defaultOpen={isGroupActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={group.title}
                        isActive={isGroupActive}
                        className="h-10 rounded-lg px-3 transition-colors data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                      >
                        <group.icon className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                        <span className="text-sm font-medium">{group.title}</span>

                        {/* count badge */}
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-accent px-1.5 text-[10px] font-semibold text-muted-foreground">
                      {group.items.length}
                    </span>

                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="relative ml-5 mt-1 gap-1 border-l border-sidebar-border pl-3">
                        {group.items.map((item) => {
                          const itemActive = pathname === item.href

                          return (
                            <SidebarMenuSubItem key={item.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={itemActive}
                                className="h-8 rounded-md px-2.5 text-[13px] transition-colors"
                              >
                                <Link href={item.href}>
                              <span
                                className={
                                  itemActive
                                    ? "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                                    : "h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30"
                                }
                              />
                                  {item.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* ── Footer ─────────────────────────────────────── */}
      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xs font-bold">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold">Admin</span>
            <span className="text-[11px] text-muted-foreground">admin@ui.studio</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>

  )
}
