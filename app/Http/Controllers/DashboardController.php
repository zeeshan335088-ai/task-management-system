<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $userId = Auth::id();

        $stats = [
            'total' => Task::where('user_id', $userId)->count(),
            'completed' => Task::where('user_id', $userId)->where('status', 'completed')->count(),
            'pending' => Task::where('user_id', $userId)->where('status', 'pending')->count(),
            'in_progress' => Task::where('user_id', $userId)->where('status', 'in_progress')->count(),
            'overdue' => Task::where('user_id', $userId)
                ->where('due_date', '<', now()->toDateString())
                ->whereNotIn('status', ['completed', 'cancelled'])
                ->count(),
        ];

        $statusChart = Task::where('user_id', $userId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $statusData = [
            ['name' => 'Pending', 'value' => $statusChart['pending'] ?? 0],
            ['name' => 'In Progress', 'value' => $statusChart['in_progress'] ?? 0],
            ['name' => 'Completed', 'value' => $statusChart['completed'] ?? 0],
            ['name' => 'Cancelled', 'value' => $statusChart['cancelled'] ?? 0],
        ];

        $priorityChart = Task::where('user_id', $userId)
            ->select('priority', DB::raw('count(*) as count'))
            ->groupBy('priority')
            ->pluck('count', 'priority')
            ->toArray();

        $priorityData = [
            ['name' => 'Low', 'value' => $priorityChart['low'] ?? 0],
            ['name' => 'Medium', 'value' => $priorityChart['medium'] ?? 0],
            ['name' => 'High', 'value' => $priorityChart['high'] ?? 0],
            ['name' => 'Urgent', 'value' => $priorityChart['urgent'] ?? 0],
        ];

        $days = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo);
            return [
                'date' => $date->format('M d'),
                'created' => 0,
                'completed' => 0,
                'raw_date' => $date->toDateString(),
            ];
        })->values();

        $createdPerDay = Task::where('user_id', $userId)
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('count', 'date')
            ->toArray();

        $completedPerDay = Task::where('user_id', $userId)
            ->where('status', 'completed')
            ->where('updated_at', '>=', now()->subDays(6)->startOfDay())
            ->select(DB::raw('DATE(updated_at) as date'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE(updated_at)'))
            ->pluck('count', 'date')
            ->toArray();

        $activityData = $days->map(function ($day) use ($createdPerDay, $completedPerDay) {
            return [
                'date' => $day['date'],
                'created' => $createdPerDay[$day['raw_date']] ?? 0,
                'completed' => $completedPerDay[$day['raw_date']] ?? 0,
            ];
        })->values()->toArray();

        $recentTasks = Task::where('user_id', $userId)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'statusData' => $statusData,
            'priorityData' => $priorityData,
            'activityData' => $activityData,
            'recentTasks' => $recentTasks,
        ]);
    }
}
