import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const post = await db.post.findUnique({
        where: { id },
        include: { comments : { orderBy: { createdAt: "desc" } } },
    });

    if (!post) return notFound();

    async function addComment(formData: FormData) {
        "use server";
        const content = formData.get("content") as string;
        const author = formData.get("author") as string || "Անանուն";

        if (!content) return;

        await db.comment.create({
            data: { content, author, postId: id },
        });

        revalidatePath(`/blog/${id}`)
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors mb-8"
            >
                ← Հետ դեպի բոլոր հոդվածները
            </Link>
            <h1 className="text-4xl font-black text-slate-900 mb-6">{post.title}</h1>
            <p className="text-slate-600 leading-relaxed mb-12 whitespace-pre-wrap">
                {post.content}
            </p>
            <hr className="my-10 border-slate-100" />

            <section>
                <h2 className="text-2xl font-bold mb-6">Մեկնաբանություններ</h2>
                
                <form
                    action={addComment}
                    className="mb-10 space-y-4"
                >
                    <input 
                        name="author"
                        placeholder="Ձեր անունը"
                        className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                    <textarea 
                        name="content"
                        placeholder="Գրեք ձեր կարծիքը․․․"
                        className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 min-h-25"
                        required
                    />
                    <button
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all"
                    >
                        Ուղարկել
                    </button>
                </form>

                <div className="space-y-4">
                    {(post as any).comments?.map((comment: any) => (
                        <div 
                            key={comment.id}
                            className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                        >
                            <p className="font-bold text-slate-700 text-sm">{comment.author}</p>
                            <p className="text-slate-600 mt-1">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </section>
            
        </div>
    );
}