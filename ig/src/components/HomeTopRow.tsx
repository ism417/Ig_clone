import { getSessionEmailOrThrow } from "@/actions"
import { prisma } from "@/db"
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import StoryForm from "./StoryForm";
import Link from "next/link";

export default async function HomeTopRow({
    friends,
    profiles,
}:{
    friends:Follower[];
    profiles:Profile[];
}){
    const sessionEmail = await getSessionEmailOrThrow();
    const storys = await prisma.story.findMany({
        where:{
            OR:
            [
                {author:{
                    in :profiles
                        .filter((p) => friends.some((f) => f.followedProfileId === p.id))
                        .map((p) => p.email)}},
                {author:sessionEmail},
            ],
        },
        distinct: ['author'], // Ensure only one story per author
        orderBy: {
            createdAt: 'desc', // Get the latest story for each author
        }
    });
    return (
        <div className="flex gap-4">
            <div >
                <StoryForm/>
                <p className="text-center text-gray-500 text-sm">
                    New Story
                </p>
            </div>
            {storys.map( async (story) => {
                const storyProfile = await prisma.profile.findFirst({
                    where:{
                        email:story.author,
                    }
                })
                return (
                    <Link href={`/storys/${story.id}`} key={story.id} className="w-24 flex flex-col items-center">
                        <div>
                            <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
                                <div className="inline-block p-0.5 bg-white dark:bg-gray-950 rounded-full">
                                    <Avatar 
                                        size="6"
                                        radius="full"
                                        fallback={'avatar'} 
                                        src={story.image || ''} />
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 text-sm">
                            { storyProfile?.email === sessionEmail ? "Your Story" : storyProfile?.username}
                        </p>
                    </Link>
                )
            })}

        </div>
    )
}