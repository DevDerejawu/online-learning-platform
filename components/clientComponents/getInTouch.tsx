"use client"
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useActionState, useEffect, useState } from "react";
import { postNewMessage } from "@/app/actions/contactFromHome";
import { newMessageType } from "@/app/customTypes/types";
export default function GetInTouch() {
    const initialStats:newMessageType = {
        errors:{},
        success: false
    }
    const [initialState, setInitialState] = useState<newMessageType>(initialStats)
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [state, formAction, pendding] = useActionState(postNewMessage, initialState);
    useEffect(() => {
  if (state.success || state.errors?.guideMessage) {
    setMessage(state?.success? state.message : state.errors?.guideMessage);

    const timer = setTimeout(() => {
      setMessage(undefined);
      setInitialState(initialStats); 
    }, 6000);

    return () => clearTimeout(timer);
  }
}, [state]);
    return (
        <section className="flex flex-col items-center mt-23" id="contact">

            <motion.h2 initial={{ y: 250, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }} className="text-center text-2xl md:text-3xl m-4">Get in touch</motion.h2>
                <motion.p initial={{ y: 250, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }} className="text-center text-xl md:text-2xl">
                    Feel free to reach out us for any questions or suggestions.
                </motion.p>
           
            <form action={formAction} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto text-slate-400 mt-16 w-full' >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>Your name</label>
                    <input name='name' type="text" placeholder='Enter your name' className='w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600' />
                    {state?.errors?.name && <p className="text-center p-2 m-2 text-red-500">{state?.errors?.name[0]}</p>}
                </motion.div>

                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>Email id</label>
                    <input name='email' type="email" placeholder='Enter your email' className='w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600' />

                    {state?.errors?.email && <p className="text-center p-2 m-2 text-red-500">{state?.errors?.email[0]}</p>}
                </motion.div>

                <motion.div className='sm:col-span-2'
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>Message</label>
                    <textarea name='message' rows={8} placeholder='Enter your message' className='resize-none w-full mt-2 p-3 outline-none rounded-lg focus-within:ring-1 transition focus:ring-indigo-600 border border-slate-700' />
                    {state?.errors?.message && <p className="text-center p-2 m-2 text-red-500">{state?.errors?.message[0]}</p>}
                </motion.div>

                <motion.button type='submit' className='w-max flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full cursor-pointer disabled:cursor-not-allowed'
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                    disabled={pendding}
                >
                    {pendding? "Sending...": "Submit"}
                    <ArrowUpRight className="size-4.5" />
                </motion.button>
                
            </form>
            {message && <p className={`${state?.success? "text-green-600": "text-red-500"}text-center p-2 m-2`}>{message}</p>}
        </section>
    );
}