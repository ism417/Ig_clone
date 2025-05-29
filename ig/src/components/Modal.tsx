'use client'

import { useRouter } from "next/navigation";
import { ReactNode } from "react"

export default function Modal({children}:{children: ReactNode}){
    const router = useRouter();
    return(
        <div
            onClick={()=> router.back() } 
            className="bg-black/80 dark:bg-gray-900/90 fixed inset-0 z-20">
            <div className="bg-white dark:bg-gray-950 dark:text-gray-300 rounded-lg left-10 right-10 top-30 bottom-30 fixed">
                <div className="top-4 bottom-4 z-30 rounded-lg absolute overflow-y-auto">
                    <div
                        onClick={ev => ev.stopPropagation()} 
                        className="p-4" >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}