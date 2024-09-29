"use client";

import { useEffect, useState } from "react";
import { firestore, auth } from "@/utils/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaTrash, FaEdit } from "react-icons/fa";
import React from "react";
import DashboardLayout from "../../../DashboardLayout";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Store selected user for deletion
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
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
        name: newUserFullName,
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

      toast({
        title: "Success",
        description: `User ${newUserFullName} was created successfully.`,
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        // Show a toast for email already in use
        toast({
          title: "Error",
          description: "The email address is already in use.",
          variant: "destructive",
        });
      } else {
        console.error("Error adding user:", error.message);
        toast({
          title: "Error",
          description: "Failed to create the user.",
          variant: "destructive",
        });
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
          name: editUserFullName,
          email: editUserEmail,
        });

        setUsers((prev) =>
          prev.map((user) =>
            user.id === editingUser.id
              ? { ...user, name: editUserFullName, email: editUserEmail }
              : user
          )
        );
        setEditingUser(null);
        setEditUserEmail("");
        setEditUserFullName("");

        toast({
          title: "Success",
          description: "User details updated successfully.",
        });
      } catch (error) {
        console.error("Error editing user:", (error as Error).message);
        toast({
          title: "Error",
          description: "Failed to update user details.",
          variant: "destructive",
        });
      }
    }
  };

  // Delete user from Firestore
  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteDoc(doc(firestore, "users", selectedUser.id));
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setIsDialogOpen(false);
        setSelectedUser(null);

        toast({
          title: "Success",
          description: `User ${selectedUser.name} was deleted successfully.`,
        });
      } catch (error) {
        console.error("Error deleting user:", (error as Error).message);
        toast({
          title: "Error",
          description: "Failed to delete user.",
          variant: "destructive",
        });
      }
    }
  };

  // Open modal to confirm deletion
  const openDeleteModal = (user: User) => {
    setSelectedUser(user); // Set the user to delete
    setIsDialogOpen(true); // Open the dialog
  };

  // Close the modal without deleting
  const closeDeleteModal = () => {
    setIsDialogOpen(false);
    setSelectedUser(null); // Clear selected user
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

      toast({
        title: "Success",
        description: `User ${isAdmin ? "demoted" : "promoted"} successfully.`,
      });
    } catch (error) {
      console.error("Error toggling admin status:", (error as Error).message);
      toast({
        title: "Error",
        description: "Failed to change user admin status.",
        variant: "destructive",
      });
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
                      onClick={() => openDeleteModal(user)}
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

          {/* Shadcn Modal for Delete Confirmation */}
          {selectedUser && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the User "{selectedUser.name}
                  "? This action cannot be undone.
                </DialogDescription>
                <DialogFooter>
                  <Button variant="ghost" onClick={closeDeleteModal}>
                    No, Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteUser}>
                    Yes, Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
