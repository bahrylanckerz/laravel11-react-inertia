import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
    const {data, setData, post, errors, reset} = useForm({
        image           : '',
        name            : '',
        description     : '',
        due_date        : '',
        priority        : '',
        project_id      : '',
        assigned_user_id: '',
        status          : '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('task.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New Task</h2>
            }
        >
            <Head title="Create New Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}>
                                <div>
                                    <InputLabel htmlFor="task_project" value="Project Name" />
                                    <SelectInput
                                        id="task_project"
                                        name="project_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('project_id', e.target.value)}
                                    >
                                        <option value="">Select Project</option>
                                        {
                                            projects.data.map((project) => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.project_id} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                                    <TextInput
                                        type="file"
                                        id="task_image_path"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.image} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name" />
                                    <TextInput
                                        type="text"
                                        id="task_name"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.name} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description" />
                                    <TextAreaInput
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.description} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                                    <TextInput
                                        type="date"
                                        id="task_due_date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.due_date} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority" />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.priority} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
                                    <SelectInput
                                        id="task_assigned_user"
                                        name="assigned_user_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {
                                            users.data.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.assigned_user_id} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status" />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.status} />
                                </div>
                                <div className="mt-4">
                                    <Link href={route('task.index')} className="bg-gray-100 hover:bg-gray-300 py-1 px-3 text-gray-800 rounded shadow transition-all mr-2">Cancel</Link>
                                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}