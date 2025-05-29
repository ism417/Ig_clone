import { Follower, Profile } from "@prisma/client";
import ProfilePosts from "./ProfilePosts";
import ProfileNav from "./ProfileNav";
import ProfilePageInfo from "./ProfilePageInfo";

export default function ProfilePageContent({
    profile,
    isOur=false,
    ourFollow=null,
}:{
    profile:Profile;
    isOur?:boolean;
    ourFollow:Follower|null,
}){
    return(
    <main>
       <ProfilePageInfo 
            profile={profile} 
            isOur={isOur} 
            ourFollow={ourFollow} 
        />
       <ProfileNav username={profile.username} isOur={isOur}/>
        <section>
            <ProfilePosts email={profile.email}></ProfilePosts>
        </section>
    </main>
    )
}