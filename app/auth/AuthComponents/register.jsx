// // components/Register.js
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, firestore } from "@/utils/firebase";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// export default function Register({ toggleForm }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await updateProfile(user, { displayName: fullName });
//       await setDoc(doc(firestore, "users", user.uid), {
//         email: user.email,
//         fullName: fullName,
//         createdAt: new Date(),
//       });

//       toast.success("Account created successfully!");
//       router.push("/");
//     } catch (error) {
//       console.error("Registration Error:", error);
//       toast.error(
//         "There was an issue with your registration. Please try again."
//       );
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-md bg-white p-8 rounded shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Register
//       </h2>
//       {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
//       <form onSubmit={handleRegister} className="space-y-6">
//         <div>
//           <label className="block text-lg font-medium text-gray-700">
//             Full Name
//           </label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
//             placeholder="Full Name"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//         >
//           Register
//         </button>
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={toggleForm}
//             className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//           >
//             Login to your account
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

// components/Register.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/utils/firebase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Register({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        fullName: fullName,
        createdAt: new Date(),
        isAdmin: false, // Set isAdmin to false by default
      });

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        "There was an issue with your registration. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white p-8 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Full Name"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Register
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={toggleForm}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Login to your account
          </button>
        </div>
      </form>
    </motion.div>
  );
}
