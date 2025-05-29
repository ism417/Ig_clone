'use client'
import { likepost, removeLikeFromPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
    post,
    sessionLike,
}:{
        post:Post,
        sessionLike?:Like | null
}){
    const router = useRouter();
    const [likeedByMe, setLikeByMe] = useState(!!sessionLike);
    const [likeCount, setLikeCount] = useState(post.likecount);
    return (
        <form
            action={ async (data:FormData) => {
                if (likeedByMe){
                    await removeLikeFromPost(data);
                    setLikeCount(prev => prev - 1);
                    setLikeByMe(false)
                } else {
                    await likepost(data);
                    setLikeCount(prev => prev + 1);
                    setLikeByMe(true)
                }
                router.refresh();
            }}
            className="flex items-center gap-2">
                <input type="hidden" name="postId" value={post.id} />
            <button type="submit">
                <HeartIcon className={likeedByMe ? 'text-red-500 fill-red-500' : 'dark:text-white'}/>
            </button>
            <p className="dark:text-gray-400">{likeCount} people like this</p>
        </form>
    )
}