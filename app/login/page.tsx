'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "@/firebase/firebase"
import {doc, getDoc, setDoc} from 'firebase/firestore'
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"

const  LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if(user.emailVerified){
                const registrationData = localStorage.getItem("registrationData");
                const {
                    email = "",
                } = registrationData ? JSON.parse(registrationData) : {};
            
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if(!userDoc.exists()){
                    await setDoc(doc(firestore, "users", user.uid), {
                        email: user.email,
                        registrationDate: new Date(),
                    });
                }

                router.push('/dashboard');
            } else{
                toast.error("Please Verify your email before loggin in.");
                setError("Please Verify your email before loggin in.");
            }
        }catch(err){
            if(err instanceof Error){
                setError(err.message);
            }else{
                setError("An error occurred");
            }
        }
    }

    return(
        <>
        <section className="bg-white text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Join Us and Breathe Easy with Eco-Friendly Cooling.
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-black rounded-xl hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
        <div className="justify-center bg-white items-center relative w-[fit-content] rounded-2xl p-3 flex flex-col mx-auto">
            <h2 className="text-4xl font-extrabold font-serif text-black  mb-10">Sign In</h2>
            <form className="space-y-4 p-5 rounded-xl" onSubmit={handleLogin}>
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
                  Sign In
                </button>
              </div>
            </form>
            <div className="p-5 rounded">
                <p className="text-sm font-medium text-black space-y-6 px-6 pb-4 rounded-xl shadow-xl">
                    Don&apos; have an account ?
                    <Link hrefLang="/register" className="text-blue-500 hover:underline" href="/register">Sign Up
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
      </>
    )
}

export default LoginPage;