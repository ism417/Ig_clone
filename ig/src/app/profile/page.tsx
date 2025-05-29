
import { auth} from "@/auth";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import ProfilePageContent from "@/components/ProfilePageContent";

export default async function ProfilePage() {
    const session = await auth();
    const profile =  await prisma.profile
        .findFirst({where:{email:session?.user?.email as string}});
        if(!profile){
            return redirect('/settings');
        }
    return (
        <ProfilePageContent profile={profile} isOur={true} ourFollow={null} />
    )
}