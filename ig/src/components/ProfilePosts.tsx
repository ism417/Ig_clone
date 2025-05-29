import { prisma } from "@/db";
import { Suspense } from "react";
import PostsGrid from "./PostsGrid";

export default async function ProfilePosts({email}:{email:string})
{
    const posts = await prisma.post.findMany({where:{author:email}});
    return (
        <PostsGrid posts={posts}/>
    );
}