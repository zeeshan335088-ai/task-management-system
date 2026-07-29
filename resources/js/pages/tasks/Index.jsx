import { useForm, Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Search, Trash2, Eye, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
function statusBadgeVariant(status) {
    switch (status) {
        case 'completed': return 'default';
        case 'in_progress': return 'secondary';
        case 'cancelled': return 'outline';
        case 'pending':
        default: return 'outline';
    }
}
function priorityBadgeVariant(priority) {
    switch (priority) {
        case 'urgent': return 'destructive';
        case 'high': return 'default';
        case 'medium': return 'secondary';
        case 'low':
        default: return 'outline';
    }
}
export default function TaskIndexPage() {
    const { flash } = usePage().props;
    const { tasks: paginatedTasks, filters } = usePage().props;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const { data, setData, processing } = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
        priority: filters.priority ?? '',
    });
    useEffect(() => {
        if (flash.success)
            toast.success(flash.success);
        if (flash.error)
            toast.error(flash.error);
    }, [flash.success, flash.error]);
    const tasksUrl = tasks.index.url();
    const tasksCreateUrl = tasks.create.url();
    const submitFilters = () => {
        router.visit(tasksUrl, { method: 'get', data, preserveState: true, replace: true });
    };
    const handleDelete = (id) => {
        setTaskToDelete(id);
        setDeleteDialogOpen(true);
    };
    const confirmDelete = () => {
        if (taskToDelete !== null) {
            router.delete(`/tasks/${taskToDelete}`, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setTaskToDelete(null);
                },
            });
        }
    };
    const formatDate = (dateStr) => {
        if (!dateStr)
            return '-';
        return new Date(dateStr).toLocaleDateString();
    };
    return (<>
            <Head title="Tasks"/>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and track all your tasks.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={tasksCreateUrl}>
                            <Plus className="size-4"/>
                            New Task
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                                    <Input id="search" name="search" placeholder="Search tasks..." className="pl-9" value={data.search} onChange={(e) => setData('search', e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter')
                submitFilters();
        }}/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value) => {
            setData('status', value);
            setTimeout(submitFilters, 0);
        }}>
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="All statuses"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All statuses</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={data.priority} onValueChange={(value) => {
            setData('priority', value);
            setTimeout(submitFilters, 0);
        }}>
                                    <SelectTrigger id="priority" className="w-full">
                                        <SelectValue placeholder="All priorities"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All priorities</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {paginatedTasks.data.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-sm text-muted-foreground">No tasks found.</p>
                            </div>) : (<>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-medium">Title</th>
                                                <th className="text-left py-3 px-4 font-medium">Status</th>
                                                <th className="text-left py-3 px-4 font-medium">Priority</th>
                                                <th className="text-left py-3 px-4 font-medium">Due Date</th>
                                                <th className="text-left py-3 px-4 font-medium">Created At</th>
                                                <th className="text-right py-3 px-4 font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedTasks.data.map((task) => (<tr key={task.id} className="border-b border-border last:border-0">
                                                    <td className="py-3 px-4 font-medium">{task.title}</td>
                                                    <td className="py-3 px-4">
                                                        <Badge variant={statusBadgeVariant(task.status)}>
                                                            {task.status.replace('_', ' ')}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Badge variant={priorityBadgeVariant(task.priority)}>
                                                            {task.priority}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4">{formatDate(task.due_date)}</td>
                                                    <td className="py-3 px-4">{formatDate(task.created_at)}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button variant="ghost" size="sm" asChild>
                                                                <Link href={tasks.show.url(task.id)}>
                                                                    <Eye className="size-4"/>
                                                                    View
                                                                </Link>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" asChild>
                                                                <Link href={tasks.edit.url(task.id)}>
                                                                    <Pencil className="size-4"/>
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(task.id)}>
                                                                <Trash2 className="size-4"/>
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {paginatedTasks.data.length} of {paginatedTasks.total} tasks
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" disabled={!paginatedTasks.prev_page_url || processing} onClick={() => router.get(paginatedTasks.prev_page_url, {}, { preserveState: true })}>
                                            <ChevronLeft className="size-4"/>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm" disabled={!paginatedTasks.next_page_url || processing} onClick={() => router.get(paginatedTasks.next_page_url, {}, { preserveState: true })}>
                                            Next
                                            <ChevronRight className="size-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </>)}
                    </CardContent>
                </Card>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Task</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this task? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={confirmDelete} disabled={processing}>
                                <Trash2 className="size-4"/>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>);
}
TaskIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: (() => {
                try {
                    return dashboard();
                }
                catch {
                    return '/dashboard';
                }
            })(),
        },
        {
            title: 'Tasks',
            href: tasks.index.url(),
        },
    ],
};
