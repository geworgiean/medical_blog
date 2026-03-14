import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {

  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPublished = formData.get("published") === "on";

    await db.post.create({
      data: {
        title: title,
        content: content,
        published: isPublished,
      },
    });

    if (isPublished) {
      redirect("/blog");
    } else {
      redirect("/blog/drafts");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">Նոր Բժշկական Հոդված</h1>
        <p className="text-gray-500 mb-8">Լրացրեք հոդվածի մանրամասները ստորև</p>

        <form action={createPost} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Վերնագիր</label>
            <input 
              name="title" 
              type="text"
              placeholder="Օրինակ՝ Առողջ սննդակարգի կարևորությունը..." 
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black transition-all"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Բովանդակություն</label>
            <textarea 
              name="content" 
              placeholder="Մանրամասն նկարագրեք հոդվածի թեման..." 
              className="w-full p-4 border border-gray-300 rounded-xl h-60 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black transition-all resize-none"
              required 
            />
          </div>
          <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <input 
              type="checkbox"
              id="published"
              name="published"
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <label
              htmlFor="published"
              className="text-slate-700 font-medium cursor-pointer select-none" 
            >
              Հրապարակել անմիջապես
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Հրապարակել Հոդվածը
          </button>
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
        >
            <span className="mr-2 gruop-hover:-translate-x-1 transition-transform">←</span>
            Հետ գնալ
        </Link>
        </form>
      </div>
    </div>
  );
}