import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default async function BlogPage(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  const posts = await db.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
      ],
    },
    orderBy: { id: 'desc' },
  });

    async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    await db.post.delete({
        where: { 
            id: id
        },
    });
    
    revalidatePath("/blog");
  }

    return (
        <main className="w-4xl mx-auto p-1 pt-10">
                <div className="flex flex-col items-center gap-6 mb-1">
                <h1 className="text-5xl font-black text-blue-900 tracking-tight">                    
                    Բժշկական Բլոգ
                </h1>
                <div className="flex items-center gap-5">
                <Link 
                    href="/blog/new"
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium"
                >
                + Նոր Հոդված
                </Link>
                <Link
                    href="/blog/drafts"
                    className="bg-slate-200 hover:bg-slate-300 text-slate-00 font-bold py-2 px-5 rounded-3xl transition-all"
                >
                    Սևագրեր
                </Link>
                </div>
                <div className="flex justify-center mb-12">
                    <form 
                        action="/blog" 
                        method="GET" 
                        className="relative w-3xl group"
                    >
                        <input 
                            type="text"
                            name="q"
                            placeholder="Փնտրել հեդված․․․"
                            defaultValue={query}
                            className="w-3xl px-7 py-3 pl-14 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md focus:border-slate-300 outline-none transition-all text-lg"
                        />
                        <div className="absolute left-6 top-6.5 -translate-y-1/2 opacity-40 text-xl">
                            🔍︎
                        </div>
                            {query && (
                        <p className="mt-3 text-sm text-slate-500">
                            Արդյունքներ «<span className="font-bold text-slate-800">{query}</span>» հարցման համար
                        </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="grid gap-6">
                {posts.length === 0 ? (
                    <p className="text-gray-500 text-center text-xl">Դեռևս հոդվածներ չկան:</p>
                ) : (
                    posts.map((post) => (
                        <article
                            key={post.id}
                            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
                        >
                            <Link href={`/blog/${post.id}`} className="text-2xl font-bold hover:underline">
                                {post.title}
                            </Link>                            
                            <p className="text-gray-600 line-clamp-3 mb-4">{post.content.substring(0, 100)}...</p>
                            <div className="text-sm text-gray-400">
                                Հրապարակված է՝ {new Date(post.createdAt).toLocaleDateString("hy-AM")}
                            </div>

                            <Link
                                href={`blog/${post.id}/edit`}
                                className="text-gray-900 hover:text-blue-700 font-semibold transition flex intems-center p-2"
                            >
                                Խմբագրել                  
                            </Link>

                            <form action={deletePost}>
                                <input 
                                    type="hidden"
                                    name="id"
                                    value={post.id}
                                />
                                <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition font-medium">
                                    Ջնջել
                                </button>
                            </form>
                        </article>
                    ))
                )}
            </div>
        </main>
    );
}