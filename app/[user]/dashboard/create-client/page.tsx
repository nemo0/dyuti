import React, { Suspense } from "react";
import CreateClientForm from "@/components/forms/CreateClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function CreateClientPage() {
  return (
    <div className="mt-6">
      <div className="my-6">
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <CreateClientForm />
        </Suspense>
      </div>
    </div>
  );
}
