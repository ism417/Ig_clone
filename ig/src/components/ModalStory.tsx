'use client'

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react"

export default function ModalStory({children}:{children: ReactNode}){
    const router = useRouter();
    const path  = usePathname();
    const storyActive = path.includes("storys");
    return(
        <div
            onClick={() => { storyActive ? router.push("/") : router.push('/profile') }} 
            className="bg-black/80 dark:bg-gray-900/90 fixed inset-0 z-20">
            <div className="rounded-lg w-auto flex justify-center">
                <div className="lg:right-90 top-20 z-30 rounded-lg absolute pl-10">
                    <div
                        onClick={ev => ev.stopPropagation()} 
                        className="" >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}