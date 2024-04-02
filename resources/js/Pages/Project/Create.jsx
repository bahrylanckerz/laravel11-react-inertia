import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const {data, setData, post, errors, reset} = useForm({
        image      : '',
        name       : '',
        description: '',
        due_date   : '',
        status     : '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('project.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New Project</h2>
            }
        >
            <Head title="Create New Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}>
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput
                                        type="file"
                                        id="project_image_path"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.image} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput
                                        type="text"
                                        id="project_name"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.name} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput
                                        id="project_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.description} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                    <TextInput
                                        type="date"
                                        id="project_due_date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.due_date} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput
                                        id="project_status"
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
                                    <Link href={route('project.index')} className="bg-gray-100 hover:bg-gray-300 py-1 px-3 text-gray-800 rounded shadow transition-all mr-2">Cancel</Link>
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