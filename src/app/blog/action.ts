"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  if (!id) return;

  try {
    await db.post.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("Database error:", error);
  }

  revalidatePath("/blog");
}