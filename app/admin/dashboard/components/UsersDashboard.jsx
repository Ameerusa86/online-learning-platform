// "use client";

// import { useEffect, useState } from "react";
// import { firestore, collection, getDocs } from "@/utils/firebase";

// export default function UsersDashboard() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(firestore, "users"));
//         setUsers(
//           usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {users.map((user) => (
//           <div key={user.id} className="border p-4 m-2 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold">{user.email}</h2>
//             <p>{user.isAdmin ? "Admin" : "User"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "@/utils/firebase";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        setUsers(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {users.map((user) => (
          <div key={user.id} className="border p-4 m-2 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{user.email}</h2>
            <p>{user.isAdmin ? "Admin" : "User"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersDashboard;
