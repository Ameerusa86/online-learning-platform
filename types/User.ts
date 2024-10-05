interface User {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

export default User;
