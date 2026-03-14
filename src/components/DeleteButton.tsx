"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/app/blog/action";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Վստա՞հ եք, որ ուզում եք ջնջել այս հոդվածը:")) {
      startTransition(async () => {
        await deletePostAction(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`
                    px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
                    ${isPending 
                    ? "text-slate-400 cursor-not-allowed" 
                    : "text-red-500 hover:bg-red-50 hover:text-red-700 active:bg-red-100"}
                    `}
    >
      {isPending ? "Ջնջվում է..." : "Ջնջել"}
    </button>
  );
}