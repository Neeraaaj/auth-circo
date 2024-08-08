'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         if (user.emailVerified) {
//           setUser(user);
//           const userDoc = await getDoc(doc(firestore, 'users', user.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             alert(`User Data: ${JSON.stringify(userData)}`);
//           }
//         } else {
//           router.push('/signin');
//         }
//       } else {
//         router.push('/signin');
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
    <div className="min-h-screen bg-gray-100 text-white flex">
      {/* Your dashboard layout */}
      <div className="flex h-screen flex-col justify-between border-e bg-white">
        {/* Sidebar */}
        {/* ... */}
      </div>
      <nav className="p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-black text-xl">Dashboard</div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center flex-grow mt-19">
        <div className="text-gray-600 text-2xl">
          Welcome, {user?.email}!
        </div>
        <button  className="mt-4 w-[50vw] py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
          Logout
        </button>
      </main>
    </div>
  );
};

export default DashboardPage;
