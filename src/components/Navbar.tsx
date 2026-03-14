import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            <Link href="/blog" className="group">
                <h1 className="text-2xl font-black text-blue-700 tracking-tighter transition-transform group-hover:scale-105">
                    Բժշկական <span className="text-slate-900">Բլոգ</span>
                </h1>
            </Link>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
                    <Link 
                        href="/blog"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Հոդվածներ
                    </Link>
                    <Link
                        href="/blog/drafts"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Սևագրեր
                    </Link>
                    <Link
                        href="/blog/new"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                    >
                        + Նոր հոդված
                    </Link>
                </div>
            </div>
            </div>
        </nav>
    )
}