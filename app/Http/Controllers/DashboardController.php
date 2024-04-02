<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $userLogin = request()->user()->id;
        $totalPendingTask    = Task::where('status', 'pending')->count();
        $myPendingTask       = Task::where('assigned_user_id', $userLogin)->where('status', 'pending')->count();
        $totalInProgressTask = Task::where('status', 'in_progress')->count();
        $myInProgressTask    = Task::where('assigned_user_id', $userLogin)->where('status', 'in_progress')->count();
        $totalCompletedTask  = Task::where('status', 'completed')->count();
        $myCompletedTask     = Task::where('assigned_user_id', $userLogin)->where('status', 'completed')->count();
        $myActiveTasks       = Task::where('assigned_user_id', $userLogin)->whereIn('status', ['pending', 'in_progress'])->limit(10)->get();
        return inertia('Dashboard', [
            'totalPendingTask'    => $totalPendingTask,
            'myPendingTask'       => $myPendingTask,
            'totalInProgressTask' => $totalInProgressTask,
            'myInProgressTask'    => $myInProgressTask,
            'totalCompletedTask'  => $totalCompletedTask,
            'myCompletedTask'     => $myCompletedTask,
            'myActiveTasks'       => TaskResource::collection($myActiveTasks),
        ]);
    }
}
