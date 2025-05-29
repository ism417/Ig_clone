import { Session } from "next-auth";
import HomeTopRow from "./HomeTopRow";
import { prisma } from "@/db";
import { getSessionEmailOrThrow } from "@/actions";
import HomePost from "./HomePost";

export default async function UserHome({session}:{session:Session}){
    const friends = await prisma.follower.findMany({
        where: {
            followingProfileEmail: await getSessionEmailOrThrow(),
        },
    });
    const profiles = await prisma.profile.findMany();
    return(
        <div className="flex flex-col gap-10">
            <HomeTopRow friends={friends} profiles={profiles}/>
            <HomePost friends={friends} profiles={profiles} />
        </div>
    )
}