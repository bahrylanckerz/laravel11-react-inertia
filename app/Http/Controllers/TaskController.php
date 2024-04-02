<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $userLogin = request()->user()->id;
        // $query     = Task::query()->where('assigned_user_id', $userLogin);
        $query     = Task::query();

        $sortField     = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks  = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks'          => TaskResource::collection($tasks) ,
            'queryParams'    => request()->query() ?: null,
            'successMessage' => session('success') ,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users    = User::orderBy('name', 'asc')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users'    => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('task', 'public');
        }
        unset($data['image']);
        Task::create($data);
        return to_route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users    = User::orderBy('name', 'asc')->get();
        return inertia('Task/Edit', [
            'task'     => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users'    => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->delete($task->image_path);
            }
            $data['image_path'] = $image->store('task', 'public');
        }
        unset($data['image']);
        $task->update($data);
        return to_route('task.index')->with('success', "Task \"$task->name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task->image_path) {
            Storage::disk('public')->delete($task->image_path);
        }
        $task->delete();
        return to_route('task.index')->with('success', "Task \"$task->name\" deleted successfully");
    }
    /**
     * Display a listing of the resource.
     */
    public function myTasks()
    {
        $userLogin = request()->user()->id;
        $query     = Task::query()->where('assigned_user_id', $userLogin);

        $sortField     = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks  = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks'          => TaskResource::collection($tasks),
            'queryParams'    => request()->query() ?: null,
            'successMessage' => session('success'),
        ]);
    }
}
