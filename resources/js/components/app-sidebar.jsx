import { Link } from '@inertiajs/react';
import {
    CheckSquare,
    Clock3,
    LayoutGrid,
    ListFilter,
    Palette,
    ShieldCheck,
    TriangleAlert,
    UserCircle2,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';
import { edit as profileEdit } from '@/routes/profile';
import { edit as securityEdit } from '@/routes/security';
import { edit as appearanceEdit } from '@/routes/appearance';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
];

const tasksNavItems = [
    {
        title: 'All Tasks',
        href: tasks.index.url(),
        icon: CheckSquare,
    },
    {
        title: 'In Progress',
        href: tasks.index.url({ query: { status: 'in_progress' } }),
        icon: Clock3,
    },
    {
        title: 'Overdue',
        href: tasks.index.url({ query: { status: 'overdue' } }),
        icon: TriangleAlert,
    },
    {
        title: 'Filters',
        href: tasks.index.url(),
        icon: ListFilter,
    },
];

const settingsNavItems = [
    {
        title: 'Profile',
        href: profileEdit.url(),
        icon: UserCircle2,
    },
    {
        title: 'Security',
        href: securityEdit.url(),
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        href: appearanceEdit.url(),
        icon: Palette,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Overview" />
                <SidebarSeparator className="mx-2 my-2" />
                <NavMain items={tasksNavItems} label="Tasks" />
                <SidebarSeparator className="mx-2 my-2" />
                <NavMain items={settingsNavItems} label="Settings" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
