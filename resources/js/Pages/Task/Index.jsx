import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, tasks, queryParams = null, successMessage }) {
    queryParams = queryParams || {}
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
                    <Link href={route('task.create')} className="bg-emerald-500 hover:bg-emerald-600 py-1 px-3 text-white rounded shadow transition-all">Add New</Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {successMessage && (
                        <div className="bg-emerald-500 text-white rounded mb-4 py-2 px-4">
                            {successMessage}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <TasksTable tasks={tasks} queryParams={queryParams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}