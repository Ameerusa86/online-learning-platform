"use client";

import { useEffect, useState } from "react";
import { firestore, auth } from "@/utils/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaTrash, FaEdit } from "react-icons/fa";
import React from "react";
import DashboardLayout from "../../../DashboardLayout";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";

// Define the User type
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newUserFullName, setNewUserFullName] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUserEmail, setEditUserEmail] = useState<string>("");
  const [editUserFullName, setEditUserFullName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        const fetchedUsers: User[] = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          isAdmin: doc.data().isAdmin,
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", (error as Error).message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUsers();
  }, []);

  // Add new user with Firebase authentication and Firestore entry
  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword || !newUserFullName) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        email: newUserEmail,
        fullName: newUserFullName,
        isAdmin: false,
        createdAt: new Date(),
      });

      setUsers((prevUsers) => [
        ...prevUsers,
        {
          id: user.uid,
          email: newUserEmail,
          name: newUserFullName,
          isAdmin: false,
        },
      ]);

      // Reset input fields
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserFullName("");
      setErrorMessage(""); // Clear error message on success
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use.");
      } else {
        console.error("Error adding user:", error.message);
        setErrorMessage("Error adding user.");
      }
    }
  };

  // Edit existing user details
  const handleEditUser = async () => {
    if (
      editingUser &&
      editUserFullName.trim() !== "" &&
      editUserEmail.trim() !== ""
    ) {
      try {
        const userDocRef = doc(firestore, "users", editingUser.id);
        await updateDoc(userDocRef, {
          fullName: editUserFullName,
          email: editUserEmail,
        });

        setUsers((prev) =>
          prev.map((user) =>
            user.id === editingUser.id
              ? { ...user, fullName: editUserFullName, email: editUserEmail }
              : user
          )
        );
        setEditingUser(null);
        setEditUserEmail("");
        setEditUserFullName("");
      } catch (error) {
        console.error("Error editing user:", (error as Error).message);
      }
    }
  };

  // Delete user from Firestore
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", (error as Error).message);
    }
  };

  // Start editing
  const handleStartEditing = (user: User) => {
    setEditingUser(user);
    setEditUserEmail(user.email);
    setEditUserFullName(user.name);
  };

  // Toggle admin status for a user
  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { isAdmin: !isAdmin });

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error toggling admin status:", (error as Error).message);
    }
  };

  // Only render users after loading is complete
  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Users Dashboard
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Users</h2>

          <div className="flex mb-4">
            <input
              type="text"
              value={newUserFullName}
              onChange={(e) => setNewUserFullName(e.target.value)}
              placeholder="Full Name"
              className="border p-2 rounded mr-2 w-full sm:w-1/4"
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded mr-2 w-full sm:w-1/4"
            />
            <input
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded mr-2 w-full sm:w-1/4"
            />
            <button
              onClick={handleAddUser}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              Add User
            </button>
          </div>

          {editingUser && (
            <div className="flex mb-4">
              <input
                type="text"
                value={editUserFullName}
                onChange={(e) => setEditUserFullName(e.target.value)}
                placeholder="Edit Full Name"
                className="border p-2 rounded mr-2 w-full sm:w-1/4"
              />
              <input
                type="email"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
                placeholder="Edit Email"
                className="border p-2 rounded mr-2 w-full sm:w-1/4"
              />
              <button
                onClick={handleEditUser}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    <button
                      onClick={() => handleStartEditing(user)}
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-600 mr-2"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                      className={`text-sm ${
                        user.isAdmin ? "text-gray-500" : "text-blue-500"
                      } hover:${
                        user.isAdmin ? "text-gray-600" : "text-blue-600"
                      } transition duration-200`}
                    >
                      {user.isAdmin ? (
                        <FaUser size={18} />
                      ) : (
                        <MdAdminPanelSettings size={18} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
