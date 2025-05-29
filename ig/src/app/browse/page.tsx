import PostsGrid from "@/components/PostsGrid"
import { prisma } from "@/db"
import { Suspense } from "react"

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy:{createdAt: 'desc'},
        take: 100,
    })
    return (
        <div> 
            <div className="mb-4">
                <h1 className="text-4xl font-bold" >Browse</h1>
            </div>
            <Suspense fallback="Loading...">
                <PostsGrid posts={posts} ></PostsGrid>
            </Suspense>
        </div>
    )
}