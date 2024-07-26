// // app/auth/login/page.js
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "../../../utils/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error state
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-4 text-red-500 text-center"
//           >
//             {error}
//           </motion.div>
//         )}
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-lg font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }
