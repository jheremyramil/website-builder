import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui";
import Link from "next/link";

export const DashboardPage = async () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans text-gray-900">
      <div className="flex h-screen flex-1 flex-col">
        <header className="h-18 bg-white flex justify-end px-8 items-center border-b border-gray-200 gap-x-6">
          <DashboardHeader />
        </header>

        <main className="p-8 space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Templates</h1>
            <Link href="/editor">
              <Button>Create New Template</Button>
            </Link>
          </header>

          <section>
            {/* <Suspense fallback={<TableSkeleton />}>
              <TemplateList templatesPromise={templates} />
            </Suspense> */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
