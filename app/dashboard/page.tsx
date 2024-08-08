"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';

const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async(user) => {
        if(user){
            setUser(user);
            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            if(userDoc.exists()){
                const userData = userDoc.data();
                alert(`User Data ${userData}`)
            }
        }else{
            router.push('/login');
        }
        setLoading(false);
        });

        return () => unsubcribe();
    }, [router]);

    const handleLogout = async () => {
        try{
            await signOut(auth);
            router.push('/login');
        }catch(err){
            console.log('Logout error', err);
        }
    };

    if(loading){
        return <div>Loading...</div>
    }            


    return(
        <div className="min-h-screen bg-gray-100 text-white flex ">
            <div className="flex h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        <img src="https://circolife.com/wp-content/uploads/2024/04/main-logo-register-png.png"/>
                    </span>

                    <ul className="mt-6 space-y-1">
                    <li>
                        <a
                        href="#"
                        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                        General
                        </a>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium"> Teams </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Banned Users
                            </a>
                            </li>

                            <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Calendar
                            </a>
                            </li>
                        </ul>
                        </details>
                    </li>

                    <li>
                        <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                        Billing
                        </a>
                    </li>

                    <li>
                        <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                        Invoices
                        </a>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium"> Account </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Details
                            </a>
                            </li>

                            <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Security
                            </a>
                            </li>

                            <li>
                            <form action="#">
                                <button
                                type="submit"
                                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                >
                                Logout
                                </button>
                            </form>
                            </li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt=""
                        src={`${user?.photoURL}`}
                        className="size-10 rounded-full object-cover"
                    />
                    </a>
                </div>
                </div>
            <nav className="p-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="text-black text-xl">
                                Dashboard
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center flex-grow mt-19">
                <div className="text-gray-600 text-2xl">
                    Welcome, {user?.email}!
                </div>
                <button onClick={handleLogout} className="mt-4 w-[50vw] py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                    Logout
                </button>
            </main>
        </div>
    );
};

export default DashboardPage;