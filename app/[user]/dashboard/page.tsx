import React from "react";
import auth from "@/lib/auth";
import Link from "next/link";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-2 mt-8">Dashboard</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <Link href={`/${session?.user._id}/dashboard/clients`}>
          <div className="px-4 py-4 bg-white dark:bg-slate-950 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Clients</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Manage your clients
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
