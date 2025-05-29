import { Follower, Profile } from "@prisma/client";
import { CheckIcon, ChevronLeft, Settings } from "lucide-react";
import FollowButton from "./FollowButton";
import { prisma } from "@/db";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePageInfo(
{
    profile,
    isOur=false,
    ourFollow=null,
}:{
    profile:Profile;
    isOur?:boolean;
    ourFollow:Follower|null,
}
){
    const story = await prisma.story.findFirst({
        where:{
            author:profile.email,
        }
    })
    return(
        <div>
            <section className="flex justify-between items-center">
                <button>
                    <ChevronLeft/>
                </button>
            <div className="font-bold flex items-center gap-1">
                {profile.username}
                <div className="size-4 rounded-full bg-blue-500 inline-flex justify-center items-center" >
                    <CheckIcon size={16}/>
                </div>
            </div>
            <div>
                {isOur && (
                    <a href="/settings">
                        <Settings/>
                    </a>
                )}
            </div>
        </section>
        <section className="mt-8 flex justify-center">
            {story ? (
                <Link href={`/storys/${story.id}`} className="size-43 p-1 rounded-full bg-gradient-to-tr from-orange-300 to-red-600"  >
                    <div className="size-41 p-1 bg-white dark:bg-gray-950 rounded-full">
                        <div className="aspect-square overflow-hidden rounded-full" >
                            <Image
                            className="object-cover w-full h-full"
                            src={profile.avatar || ""} alt="avatar" />
                        </div>
                    </div>
                </Link>
            ):(
                <div className="size-41 p-1 rounded-full">
                    <div className="aspect-square overflow-hidden rounded-full" >
                        <Image
                        className="object-cover w-full h-full"
                        src={profile.avatar || ""} alt="avatar" ></Image>
                    </div>
                </div>
            )}
        </section>
        <section className="text-center mt-4">
            <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 mt-1 mb-1"  > {profile.subtitle}</p>
                <p>
                    {profile.bio}
                </p>
        </section>
        {!isOur && (
            <section className="flex justify-center my-3">
                <FollowButton 
                    ourFollow={ourFollow}
                    profileIdToFollow={profile.id}/>
            </section>
        )}
        </div>
    )
}