import Link from 'next/link'

const DesctopNavLinks = () => {
   const navlinks = [
        
        {
            href: "#about",
            text: "About",
        },
        {
            href: "#courses",
            text: "Courses",
        },
        {
            href: "#contact",
            text: "Contact",
        },
    ];
  return (
    <>
    <Link href="/" className="text-2xl hover:text-orange-400">LearningHUB</Link>

                <div className="hidden lg:flex items-center gap-8 transition duration-500">
                    {navlinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-slate-300 transition">
                            {link.text}
                        </Link>
                    ))}
                </div>
                    
                <div className="hidden lg:block space-x-3">
                    <Link href="/login" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md active:scale-95">
                        Get started
                    </Link>
                    <Link href="/login" className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md active:scale-95">
                        Login
                    </Link>
                </div>
    </>
  )
}

export default DesctopNavLinks