"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  try {
    await db.post.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/blog/drafts");
    
    return { success: true };
  } catch (error) {
    console.error("Ջնջման սխալ:", error);
    return { success: false };
  }
}