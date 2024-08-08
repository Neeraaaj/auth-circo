"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/Aurora-background";
import { toast, ToastContainer } from 'react-toastify';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);

            localStorage.setItem(
                'registrationData',
                JSON.stringify({ email: userCredential.user.email })
            );

            toast.success('Registration successful! Please check your email to verify your account.');
            router.push('/');

            setEmail('');
            setPassword('');
        } catch (error) {
            toast.error('Error creating user. Please try again later.')
        }
    };

    return (
        <div className="font-[sans-serif]">
            <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold font-mono dark:text-white text-center">
        Sign Up for Smart Cooling, Sustainable Living.
        </div>
        <div className="font-extralight font-sans text-base md:text-4xl dark:text-neutral-200 py-4">
            India’s Smartest and most Eco-Friendly Product
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Scroll Down to Sign Up
        </button>
      </motion.div>
    </AuroraBackground>
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                        <form className="space-y-4" onSubmit={handleRegister}>
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-3xl font-extrabold font-sans text-center">Sign Up</h3>
                                <p className="text-gray-500 text-sm mt-4 leading-relaxed font-serif font-medium justify-center text-center">Join Us in Cooling the World, Sustainably</p>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="email"
                                        value={email}
                                        required
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        placeholder="Enter your email id"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        value={password}
                                        required
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit"
                                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:h-[fit-content] md:h-[fit-content] max-md:mt-8 flex flex-col ">
                        <div className="flex justify-center items-center">
                            <img className="w-[55vw] lg:w-[20vw]" src="https://circolife.com/wp-content/uploads/2023/12/post-04-04-04-04-04.png" alt="World image" />
                        </div>
                        <img src="https://circolife.com/wp-content/uploads/2023/12/Pink-Simple-Box-Tweet-Instagram-Post-Template-2.png" alt="Second image" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RegisterPage;
