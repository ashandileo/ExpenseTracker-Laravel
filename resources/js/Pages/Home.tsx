import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Expense Tracker
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Laravel + Inertia.js + React is ready!
                    </p>
                </div>
            </div>
        </>
    );
}
