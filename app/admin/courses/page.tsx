import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

// Mock data - this would come from your API
async function getCourses() {
  return [
    {
      id: "1",
      title: "React Fundamentals",
      status: "published",
      enrollments: 45,
      createdAt: "2024-01-15",
      updatedAt: "2024-02-01",
    },
    {
      id: "2",
      title: "JavaScript Advanced",
      status: "draft",
      enrollments: 0,
      createdAt: "2024-02-10",
      updatedAt: "2024-02-15",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      status: "published",
      enrollments: 23,
      createdAt: "2024-01-20",
      updatedAt: "2024-02-05",
    },
  ];
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  const statCard = (label: string, value: string | number) => (
    <div className="rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6 md:py-14">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Course Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Create and manage your courses.
            </p>
          </div>
          <Button asChild size="sm" className="h-11 px-6">
            <Link href="/admin/courses/new">Create New Course</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCard("Total Courses", courses.length)}
          {statCard(
            "Published",
            courses.filter((c) => c.status === "published").length
          )}
          {statCard(
            "Total Enrollments",
            courses.reduce((sum, c) => sum + c.enrollments, 0)
          )}
          {statCard(
            "Drafts",
            courses.filter((c) => c.status === "draft").length
          )}
        </div>

        {/* Courses Table */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur">
          <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
            <h2 className="text-lg font-semibold tracking-tight">
              All Courses
            </h2>
            <span className="text-xs text-muted-foreground">
              {courses.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Course</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Updated</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  const statusStyles =
                    course.status === "published"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400";
                  return (
                    <tr
                      key={course.id}
                      className="border-t border-border/60 hover:bg-muted/30"
                    >
                      <td className="px-6 py-3 align-top">
                        <div className="font-medium leading-tight">
                          {course.title}
                        </div>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          ID: {course.id}
                        </div>
                      </td>
                      <td className="px-6 py-3 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${statusStyles}`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 align-top font-medium">
                        {course.enrollments}
                      </td>
                      <td className="px-6 py-3 align-top text-muted-foreground">
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 align-top space-x-3">
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}/sections`}
                          className="text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                          Sections
                        </Link>
                        <button className="text-destructive hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
