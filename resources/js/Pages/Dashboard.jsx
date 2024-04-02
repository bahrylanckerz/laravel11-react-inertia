import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalPendingTask, myPendingTask, totalInProgressTask, myInProgressTask, totalCompletedTask, myCompletedTask, myActiveTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-lg text-amber-500'>Pending Task</h3>
                            <p>{ myPendingTask + " / " + totalPendingTask }</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-lg text-blue-500'>In Progress Task</h3>
                            <p>{ myInProgressTask + " / " + totalInProgressTask }</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-lg text-green-500'>Completed Task</h3>
                            <p>{ myCompletedTask + " / " + totalCompletedTask }</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pb-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className='mb-4'>My Active Task</p>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Project Name</th>
                                        <th className="px-3 py-3">Task Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myActiveTasks.data.map((task) => (
                                            <tr>
                                                <td className='px-3 py-2'>{task.id}</td>
                                                <td className='px-3 py-2'>
                                                    <Link href={route('project.show', task.project)} className="text-blue-500 hover:underline">
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className='px-3 py-2'>
                                                    <Link href={route('task.show', task)} className="text-blue-500 hover:underline">
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className='px-3 py-2'>
                                                    <span className={
                                                        "px-2 py-1 rounded text-white text-nowrap" +
                                                        TASK_STATUS_CLASS_MAP[task.status]
                                                    }>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2'>{task.due_date}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
