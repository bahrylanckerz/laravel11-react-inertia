<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'description'  => $this->description,
            'status'       => $this->status,
            'priority'     => $this->priority,
            'due_date'     => (new Carbon($this->due_date))->format('Y-m-d'),
            'image_path'   => $this->image_path ? Storage::url($this->image_path) : null,
            'project'      => new ProjectResource($this->project),
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'created_at'   => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at'   => (new Carbon($this->updated_at))->format('Y-m-d'),
            'createdBy'    => new UserResource($this->createdBy),
            'updatedBy'    => new UserResource($this->updatedBy),
        ];
    }
}
