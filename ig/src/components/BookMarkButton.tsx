'use client'
import { Bookpost, likepost, removeBookFromPost, removeLikeFromPost } from "@/actions";
import { Like, Post, bookmark } from "@prisma/client";
import { BookMarkedIcon, BookmarkIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookMarkButton({
    post,
    sessionBook,
}:{
        post:Post,
        sessionBook?:bookmark | null
}){
    const router = useRouter();
    const [BookedByMe, setBookByMe] = useState(!!sessionBook);
    return (
        <form
            action={ async (data:FormData) => {
                if (BookedByMe){
                    await removeBookFromPost(data);
                    setBookByMe(false)
                } else {
                    await Bookpost(data);
                    setBookByMe(true)
                }
                router.refresh();
            }}
            className="flex items-center gap-2">
                <input type="hidden" name="postId" value={post.id} />
            <button type="submit">
                <BookmarkIcon className={BookedByMe ? 'text-black fill-black dark:fill-white dark:text-white' : 'dark:text-white'}/>
            </button>
        </form>
    )
}