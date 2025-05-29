import { getSessionEmailOrThrow, startConvo } from "@/actions";
import { auth } from "@/auth";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

export default async function ConversationList(){
    const session = await auth();
    const myProfile =  await prisma.profile
        .findFirst({where:{email:session?.user?.email as string}});
    const friends = await prisma.follower.findMany({
        where: {
            followingProfileEmail: await getSessionEmailOrThrow(),
        },
    });
    const profiles = await prisma.profile.findMany({
        where:
        {
            id : {in: friends.map(f=>f.followedProfileId)},
        },
    });
    const convos = await prisma.convo.findMany({
        where:{
            OR:[
                {srcId:myProfile?.id as string},
                {destId:myProfile?.id as string},
            ]
        },
    });
    return (
        <div className="w-1/3 font-bold ">
            <div className="flex justify-between pr-2 mb-4">
                <h1>Messages</h1>
                <h1>{myProfile?.username}</h1>
            </div>
            <div>
                {profiles.map(async profile => {
                    if (typeof convos.find(con => con.destId === profile.id || con.srcId === profile.id) == 'undefined')
                        startConvo(profile);
                    return (
                        <Link href={`/dms/${convos.find(con => con.destId === profile.id || con.srcId === profile.id )?.id}`}  key={profile.id} className="flex items-center gap-2">
                                <Avatar 
                                    size="3"
                                    radius="full"
                                    fallback={'avatar'} 
                                    src={profile.avatar || ''}
                                />
                                <p> {profile.name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}