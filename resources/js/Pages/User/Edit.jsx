import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
    const {data, setData, post, errors, reset} = useForm({
        name                 : user.name || '',
        email                : user.email || '',
        password             : '',
        password_confirmation: '',
        _method              : 'PUT',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('user.update', user));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit User</h2>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="User Full Name" />
                                    <TextInput
                                        type="text"
                                        id="user_name"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        autocomplete="off"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.name} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_email" value="Email Address" />
                                    <TextInput
                                        type="email"
                                        id="user_email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.email} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password (optional)" />
                                    <TextInput
                                        type="password"
                                        id="user_password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.password} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirm Password  (optional)" />
                                    <TextInput
                                        type="password"
                                        id="user_password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError className="mt-1 text-sm text-red-500" message={errors.password_confirmation} />
                                </div>
                                <div className="mt-4">
                                    <Link href={route('user.index')} className="bg-gray-100 hover:bg-gray-300 py-1 px-3 text-gray-800 rounded shadow transition-all mr-2">Cancel</Link>
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