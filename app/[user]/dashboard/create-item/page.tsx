import React, { Suspense } from "react";
import CreateItemForm from "@/components/forms/CreateItem";
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
          <CreateItemForm />
        </Suspense>
      </div>
    </div>
  );
}
