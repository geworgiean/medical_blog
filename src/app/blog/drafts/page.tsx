import { db } from "@/lib/db";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";


export default async function DraftsPage() {
    const drafts = await db.post.findMany({
        where: {
            published: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className=" text-xl font-black text-slate-800">Իմ սևագրերը</h1>
                        <p className="text-slate-500 mt-1">Այստեղ այն հոդվածներն են, որոնք դեռ պատրաստ չեն հրապարակման</p>
                    </div>
                    <Link
                        href="/blog"
                        className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        ← Հետ դեպի բլոգ
                    </Link>
                </div>
                {drafts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">Սևագրեր չկան...</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {drafts.map((post: any) => (
                            <div
                                key={post.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-slate-700 group-hover:text-green-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-5440 mt-1">
                                        ID: {post.id.substring(0, )}
                                    </p>
                                </div>
                                <div>
                                <Link
                                    href={`/blog/${post.id}/edit`}
                                    className="bg-slate-100 hover:bg-green-600 hover:text-white text-slate-600 px-3 py-1 rounded-xl text-sm font-bold transition-all"
                                >
                                    Խմբագրել
                                </Link>
                                
                                <DeleteButton id={post.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}