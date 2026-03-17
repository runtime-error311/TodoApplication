import { useState } from "react";
import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className=" min-h-screen w-full flex justify-center items-center">
      <div role="alert">
        <h2>Something went wrong!</h2>

        <pre className=" text-red-500">
          {error instanceof Error ? error.message : String(error)}
        </pre>

        <button
          className=" bordr-2 cursor-pointer border-black  bg-red-500 hover:bg-red-300 px-4 py-2 my-2  rounded-xl shadow-md"
          onClick={resetErrorBoundary} 
        >
          Retry
        </button>
      </div>
    </div>
  );
}
