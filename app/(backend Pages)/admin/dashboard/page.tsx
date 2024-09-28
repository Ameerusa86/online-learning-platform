import { Dashboard } from "./_components/Dashboard/Dashboard";
import { Sidebar } from "./_components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
