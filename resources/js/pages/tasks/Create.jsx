import { useForm, Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
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
export default function TaskCreatePage() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
    });
    useEffect(() => {
        if (flash.success)
            toast.success(flash.success);
        if (flash.error)
            toast.error(flash.error);
    }, [flash.success, flash.error]);
    const tasksUrl = tasks.index.url();
    const createUrl = tasks.create.url();
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/tasks');
    };
    return (<>
            <Head title="Create Task"/>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Create Task</h1>
                        <p className="text-sm text-muted-foreground">
                            Add a new task to your task list.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={tasksUrl}>
                            <ArrowLeft className="size-4"/>
                            Back to Tasks
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input id="title" required placeholder="Enter task title" value={data.title} onChange={(e) => setData('title', e.target.value)}/>
                                {errors.title && (<p className="text-sm text-destructive">{errors.title}</p>)}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea id="description" rows={4} placeholder="Enter task description" className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" value={data.description} onChange={(e) => setData('description', e.target.value)}/>
                                {errors.description && (<p className="text-sm text-destructive">{errors.description}</p>)}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger id="status" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (<p className="text-sm text-destructive">{errors.status}</p>)}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                                        <SelectTrigger id="priority" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && (<p className="text-sm text-destructive">{errors.priority}</p>)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="due_date">Due Date</Label>
                                <Input id="due_date" type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)}/>
                                {errors.due_date && (<p className="text-sm text-destructive">{errors.due_date}</p>)}
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" asChild>
                                    <Link href={tasksUrl}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="size-4"/>
                                    Create Task
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>);
}
TaskCreatePage.layout = {
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
            title: 'Create Task',
            href: tasks.create.url(),
        },
    ],
};
