import { prisma } from "@/db"
import Avatar from "./Avatar"
import Link from "next/link"
import PostsGrid from "./PostsGrid";
import { profile } from "console";

export default async function SearchResult({query}:{query:string}){
    const profiles = await prisma.profile.findMany({
        where: {
            OR: [
                {username: {contains: query},},
                {name: {contains: query},},
            ],
        },
        take:10,
    });
    const posts = await prisma.post.findMany({
        where: {
            description: {contains: query},
        },
        take:100,
    })
    return(
        <div>
            <h1 className="text-lg mt-4">
                Search result for "{query}"
            </h1>
            {profiles.length > 0 && (
                <div className="grid mt-4 sm:grid-cols-2 gap-2" >
                    {profiles?.map(profile => (
                        <Link 
                            key={profile.id}
                            href={`/users/${profile.username}`} 
                            className="flex  gap-2 bg-gray-100 dark:bg-gray-800 border dark:border-0 border-gray-300 p-2 rounded-full" >
                            <div>
                                <Avatar src={profile.avatar || ''}/>
                            </div>
                            <div className="mt-1">
                                <h3>{profile.name}</h3>
                                <h4 className="text-gray-500 text-sm">
                                    @{profile.username}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="mt-4">
                <PostsGrid posts={posts} />
            </div>
        </div>
    )
}