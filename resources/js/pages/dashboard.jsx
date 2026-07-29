import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import { CheckCircle2, Clock, ListTodo, Plus, AlertTriangle, Loader2, } from 'lucide-react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
const STATUS_COLORS = {
    Pending: '#f59e0b',
    'In Progress': '#3b82f6',
    Completed: '#22c55e',
    Cancelled: '#6b7280',
};
const PRIORITY_COLORS = {
    Low: '#6b7280',
    Medium: '#3b82f6',
    High: '#f59e0b',
    Urgent: '#ef4444',
};
function statusBadgeVariant(status) {
    switch (status) {
        case 'completed':
            return 'default';
        case 'in_progress':
            return 'secondary';
        case 'cancelled':
            return 'outline';
        case 'pending':
        default:
            return 'outline';
    }
}
function priorityBadgeVariant(priority) {
    switch (priority) {
        case 'urgent':
            return 'destructive';
        case 'high':
            return 'default';
        case 'medium':
            return 'secondary';
        case 'low':
        default:
            return 'outline';
    }
}
export default function DashboardPage() {
    const { flash } = usePage().props;
    const { stats, statusData, priorityData, activityData, recentTasks } = usePage().props;
    useEffect(() => {
        if (flash.success)
            toast.success(flash.success);
        if (flash.error)
            toast.error(flash.error);
    }, [flash.success, flash.error]);
    return (<>
            <Head title="Dashboard"/>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Overview of your tasks and activity.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={tasks.create.url()}>
                            <Plus className="size-4"/>
                            New Task
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                            <ListTodo className="size-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">
                                Across all statuses
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <CheckCircle2 className="size-4 text-green-500"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.completed}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0
            ? `${Math.round((stats.completed / stats.total) * 100)}% completion`
            : 'No tasks yet'}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <Loader2 className="size-4 text-blue-500"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.in_progress}
                            </div>
                            <p className="text-xs text-muted-foreground">Currently being worked on</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="size-4 text-amber-500"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">
                                {stats.pending}
                            </div>
                            <p className="text-xs text-muted-foreground">Awaiting to be started</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                            <AlertTriangle className="size-4 text-red-500"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.overdue}
                            </div>
                            <p className="text-xs text-muted-foreground">Past due date</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks by Status</CardTitle>
                            <CardDescription>Distribution across statuses</CardDescription>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                                        {statusData.map((entry) => (<Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#888'}/>))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks by Priority</CardTitle>
                            <CardDescription>Distribution across priorities</CardDescription>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={priorityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                                        {priorityData.map((entry) => (<Cell key={entry.name} fill={PRIORITY_COLORS[entry.name] ?? '#888'}/>))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>7-Day Activity</CardTitle>
                        <CardDescription>Tasks created and completed per day</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis allowDecimals={false}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="created" fill="#3b82f6" name="Created" radius={[4, 4, 0, 0]}/>
                                <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Tasks</CardTitle>
                            <CardDescription>Latest tasks created</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={tasks.index.url()}>View all</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentTasks.length === 0 ? (<div className="flex flex-col items-center justify-center py-8 text-center">
                                <ListTodo className="mb-2 size-8 text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">No tasks yet.</p>
                                <Button className="mt-4" size="sm" asChild>
                                    <Link href={tasks.create.url()}>
                                        <Plus className="size-4"/>
                                        Create your first task
                                    </Link>
                                </Button>
                            </div>) : (<div className="divide-y divide-border rounded-md border">
                                {recentTasks.map((task) => (<div key={task.id} className="flex items-center justify-between p-4">
                                        <div className="flex min-w-0 flex-col gap-1">
                                            <span className="truncate font-medium">{task.title}</span>
                                            <div className="flex gap-2">
                                                <Badge variant={statusBadgeVariant(task.status)}>
                                                    {task.status.replace('_', ' ')}
                                                </Badge>
                                                <Badge variant={priorityBadgeVariant(task.priority)}>
                                                    {task.priority}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={tasks.show.url(task.id)}>
                                                View
                                            </Link>
                                        </Button>
                                    </div>))}
                            </div>)}
                    </CardContent>
                </Card>
            </div>
        </>);
}
DashboardPage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
