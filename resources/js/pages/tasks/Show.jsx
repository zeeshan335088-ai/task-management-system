import { Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
export default function TaskShowPage(props) {
    const { flash } = usePage().props;
    const { task } = props;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        if (flash.success)
            toast.success(flash.success);
        if (flash.error)
            toast.error(flash.error);
    }, [flash.success, flash.error]);
    const tasksUrl = tasks.index.url();
    const editUrl = tasks.edit.url(task.id);
    const showUrl = tasks.show.url(task.id);
    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/tasks/${task.id}`, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setDeleting(false);
            },
            onError: () => {
                setDeleting(false);
            },
        });
    };
    const formatDate = (dateStr) => {
        if (!dateStr)
            return '-';
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const formatDateTime = (dateStr) => {
        return new Date(dateStr).toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (<>
            <Head title={task.title}/>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Task Details</h1>
                        <p className="text-sm text-muted-foreground">
                            View the full details of this task.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={tasksUrl}>
                                <ArrowLeft className="size-4"/>
                                Back to Tasks
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={editUrl}>
                                <Pencil className="size-4"/>
                                Edit Task
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                            <Trash2 className="size-4"/>
                            Delete
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={statusBadgeVariant(task.status)}>
                                    {task.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant={priorityBadgeVariant(task.priority)}>
                                    {task.priority}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {task.description && (<div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                                <p className="whitespace-pre-wrap text-base leading-relaxed">
                                    {task.description}
                                </p>
                            </div>)}

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2 rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="size-4"/>
                                    Due Date
                                </div>
                                <p className="text-base font-medium">{formatDate(task.due_date)}</p>
                            </div>
                            <div className="space-y-2 rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Clock className="size-4"/>
                                    Created
                                </div>
                                <p className="text-sm">{formatDateTime(task.created_at)}</p>
                            </div>
                        </div>

                        <div className="space-y-2 rounded-lg border p-4">
                            <div className="text-sm font-medium text-muted-foreground">
                                Last Updated
                            </div>
                            <p className="text-sm">{formatDateTime(task.updated_at)}</p>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Task</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete "{task.title}"? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" disabled={deleting}>Cancel</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
                                <Trash2 className="size-4"/>
                                {deleting ? 'Deleting...' : 'Delete Task'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>);
}
TaskShowPage.layout = (page) => ({
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
        {
            title: page.props.task.title,
            href: tasks.show.url(page.props.task.id),
        },
    ],
});
