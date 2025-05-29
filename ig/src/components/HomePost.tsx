import { getSessionEmailOrThrow } from "@/actions";
import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { formatDate } from "date-fns";
import Link from "next/link";
import BookMarkButton from "./BookMarkButton";

export default async function HomePost({
    friends,
    profiles,
}:{
    friends:Follower[];
    profiles:Profile[];
}){
    const sessionEmail = await getSessionEmailOrThrow();
    const posts = await prisma.post.findMany({
        where:{
            author: {in : profiles.map(p => p.email)},
        },
        orderBy:{
            createdAt: 'desc',
        },
        take: 100,
    });
    const likes = await prisma.like.findMany({
        where:{
            author: sessionEmail,
            postId: {in : posts.map(p => p.id)},
        }
    });
    const books = await prisma.bookmark.findMany({
        where:{
            profileBookingEmail: sessionEmail,
            postId: {in : posts.map(p => p.id)},
        }
    })
    return (
        <div className="max-w-md mx-auto flex flex-col gap-5 ">
            {posts.map(post => {
                const profile = profiles.find(p => p.email === post.author)
                return (
                    <div
                        key={post.id}
                        className="pb-5 border-b border-b-gray-300">
                            <div className="flex items-center gap-2 mb-2" >
                                <Avatar 
                                    radius="full" 
                                    fallback="avatar"
                                    size="4" 
                                    src={profile?.avatar || ''}  />
                                <Link 
                                    href={`/users/${profile?.username}`} 
                                    className="font-bold" >{profile?.name}
                                </Link>
                                <div className="text-md text-gray-400">
                                    {formatDate(post.createdAt,'HH')}h
                                </div>
                            </div>
                            <Link href={`/posts/${post.id}`}>
                                <img 
                                    className="block rounded-lg shadow-md shadow-black/50"
                                    src={post.image} 
                                    alt="post" />
                            </Link>
                            <div className="mt-3 flex  justify-between">
                                <LikesInfo post={post} sessionLike={likes.find(like => like.postId === post.id)}/>
                                <BookMarkButton post={post} sessionBook={books.find(book => book.postId === post.id)}/>
                            </div>
                            <div className="flex items-center gap-2 mt-2" >
                                <Link 
                                    href={`/users/${profile?.username}`} 
                                    className="font-bold" >{profile?.name}
                                </Link>
                                <div>{post.description}</div>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}