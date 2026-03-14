import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import Link from "next/link";

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const post = await db.post.findUnique({
    where: { id: id } as any, 
  });

  if (!post) {
    return <div className="p-10 text-center">Հոդվածը չի գտնվել (ID: {id})</div>;
  }

  async function updatePost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";

    await db.post.update({
      where: { id: id } as any, 
      data: { title, content, published },
    });

    revalidatePath("/blog");
    redirect("/blog");
  }

  

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-slate-100">
                    <div className="bg-green-600 p-8 text-white text-center">                        
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Խմբագրել Հոդվածը</h1>
                        <p className="mt-2 text-amber-50 opacity-90 text-sm">Փոփոխեք հոդվածի տվյալները և պահպանեք</p>
                    </div>

                    <form 
                        action={updatePost} className="p-8 space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Վերնագիր</label>
                            <input 
                                name="title"
                                defaultValue={post.title}
                                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Բովանդակություն</label>
                            <textarea 
                                name="content"
                                defaultValue={post.content}
                                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all min-h-50"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-medium border border-slate-100">
                            <input 
                                type="checkbox"
                                name="published"
                                id="published"
                                defaultChecked={post.published}
                                className="w-6 h-6 accent-green-600 cursor-pointer"
                            />
                            <label 
                                htmlFor="published"
                                className="text-sm font-bold text-slate-700 cursor-pointer select-none"
                            >
                                Հրապարակել հոդվածը
                            </label>
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Պահպանել Փոփոխությունները
                            </button>

                            <Link 
                                href="/blog/drafts"
                                className="items-center px-8 py-3  font-bold rounded-xl transition-all  mx-auto" >
                                Չեղարկել
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}