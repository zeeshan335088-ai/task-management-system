<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;

$user = User::firstOrCreate(
    ['email' => 'demo@example.com'],
    ['name' => 'Demo User', 'password' => Hash::make('password1234')]
);
echo 'User ID: '.$user->id.' Email: '.$user->email.PHP_EOL;

Task::where('user_id', $user->id)->delete();

$tasks = [
    ['title' => 'Design landing page mockup', 'description' => 'Create initial wireframes and mockups for the marketing landing page.', 'status' => 'completed', 'priority' => 'high', 'due_date' => now()->subDays(2)],
    ['title' => 'Setup CI/CD pipeline', 'description' => 'Configure GitHub Actions for automated testing and deployment.', 'status' => 'in_progress', 'priority' => 'high', 'due_date' => now()->addDays(2)],
    ['title' => 'Write API documentation', 'description' => 'Document all REST API endpoints with request/response examples.', 'status' => 'in_progress', 'priority' => 'medium', 'due_date' => now()->addDays(5)],
    ['title' => 'User research interviews', 'description' => 'Conduct 5 user interviews to gather feedback on the product.', 'status' => 'pending', 'priority' => 'medium', 'due_date' => now()->addDays(7)],
    ['title' => 'Fix checkout bug', 'description' => 'Payment processing fails when user has special characters in address.', 'status' => 'pending', 'priority' => 'urgent', 'due_date' => now()->subDays(1)],
    ['title' => 'Optimize database queries', 'description' => 'Add indexes and optimize N+1 queries on dashboard page.', 'status' => 'completed', 'priority' => 'medium', 'due_date' => now()->subDays(5)],
    ['title' => 'Setup staging environment', 'description' => 'Provision and configure staging server for QA testing.', 'status' => 'cancelled', 'priority' => 'low', 'due_date' => now()->addDays(10)],
    ['title' => 'Create onboarding flow', 'description' => 'Design and implement step-by-step onboarding for new users.', 'status' => 'pending', 'priority' => 'high', 'due_date' => now()->addDays(14)],
];

foreach ($tasks as $idx => $t) {
    $task = new Task();
    $task->title = $t['title'];
    $task->description = $t['description'];
    $task->status = $t['status'];
    $task->priority = $t['priority'];
    $task->due_date = $t['due_date'];
    $task->user_id = $user->id;
    $task->save();
    $daysAgo = ($idx * 7 + 3) % 7;
    if ($t['status'] === 'completed') {
        $task->created_at = now()->subDays($daysAgo + 1);
        $task->updated_at = now()->subDays($daysAgo);
    } else {
        $task->created_at = now()->subDays($daysAgo);
    }
    $task->save();
}

echo 'Created '.count($tasks).' tasks for demo user'.PHP_EOL;
