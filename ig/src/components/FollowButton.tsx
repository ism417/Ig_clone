'use client'
import { followUser, unfollowUser } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinus, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
    profileIdToFollow,
    ourFollow=null,
}:{
    profileIdToFollow:string;
    ourFollow:Follower|null;

}){
    const router = useRouter();
    const [isFollowd,setIsfollowed] = useState<boolean>(!!ourFollow);
    return(
        <form action={async () =>{
            if (isFollowd){
                setIsfollowed(false);
                await unfollowUser(profileIdToFollow);
            } else {
                setIsfollowed(true);
                await followUser(profileIdToFollow);
            }
            router.refresh();
        }}>
            <Button>
                {isFollowd ? <UserMinus/> : <UserPlusIcon/>}
                {isFollowd ? 'Unfollow':'Follow'}
            </Button>
        </form>
            
    )
}