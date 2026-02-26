"use client"
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function HeroSection() {

    const supabase = createClient();
    const router = useRouter();

    function hasUserSession(){
        supabase.auth.getSession().then(({data})=>{
            if(data.session){
                router.push('/dashboard/user')
            }else{
                router.push('/login')
            }
        })
    }
    return (
        <section className="flex flex-col items-center mt-18">
          
           
            <motion.h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl mb-4"
                initial={{ x: -250, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Let's build tech industry together.
            </motion.h1>
            <motion.p className="text-center text-base max-w-lg mt-4"
                initial={{ x: 250, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                Our platform helps you to get the latest tech skills.
            </motion.p>
            <motion.div className="flex items-center gap-4 mt-8"
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11 mt-5 cursor-pointer" onClick={()=>hasUserSession()}>
                    Get started (It's free)
                    <ArrowRight className="size-5" />
                </button>
               
            </motion.div>
            
        </section>
    );
}