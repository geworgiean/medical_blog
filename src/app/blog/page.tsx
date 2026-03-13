import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default async function BlogPage() {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
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
        <main className="max-w-4xl mx-auto p-10 ">
            <div className="flex justify-between items-center mb-10 ">
                <h1 className="text-4xl font-extrabold text-blue-900">Բժշկական Բլոգ</h1>
                <Link 
                    href="/blog/new"
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium"
                >
                + Նոր Հոդված
                </Link>
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
                            <div className="text-sm text-gray-400">
                                Հրապարակված է՝ {new Date(post.createdAt).toLocaleDateString("hy-AM")}
                            </div>

                            <Link
                                href={`blog/${post.id}/edit`}
                                className="text-gray-900 hover:text-gray-50 font-semibold transition flex intems-center p-2"
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