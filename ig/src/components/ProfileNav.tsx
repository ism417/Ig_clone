'use client'
import { usePathname } from "next/navigation"

export default function ProfileNav({
    isOur,
    username,
}:{
    isOur:Boolean;
    username:String|null;
}){
    const path  = usePathname();
    const bookmarkActive = path.includes('bookmarks');
    const postsActive = !bookmarkActive;
    return(
        <section className="mt-4 mb-3">
            <div className=" flex justify-center gap-4 font-bold" >
                <a className={postsActive ? "": "text-gray-400"} href={isOur ? '/profile' : `/users/${username}`} > Posts</a>
                {isOur && (
                    <a className={ bookmarkActive ? "" :"text-gray-400" } href={'/profile/bookmarks'} >Bookmarks</a>
                )}
            </div>
        </section>
    )
}