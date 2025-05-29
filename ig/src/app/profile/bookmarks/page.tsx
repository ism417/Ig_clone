import ProfileNav from "@/components/ProfileNav";
import { auth } from "@/auth";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import PostsGrid from "@/components/PostsGrid";

export default async function bookMarkPage(){
    const session = await auth();
    const profile =  await prisma.profile
    .findFirst({where:{email:session?.user?.email as string}});
    if(!profile){
        return redirect('/settings');
    }
    const books = await prisma.bookmark.findMany({
        where:{
            profileBookingEmail:profile.email,
        }
    })
    const posts = await prisma.post.findMany({
        where:{
            id: {in: books.map(p => p.postId)}
        }
    })
    return (
        <div>
            <ProfilePageInfo 
                profile={profile} isOur={true} ourFollow={null} 
            />
            <ProfileNav username={profile.username} isOur={true}/>
            <PostsGrid posts={posts}/>
        </div>
    )
}