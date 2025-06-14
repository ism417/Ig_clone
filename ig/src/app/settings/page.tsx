import { prisma } from "@/db";
import { Button} from "@radix-ui/themes";
import { auth, signOut} from "@/auth";
import SettingsForm from "@/components/SettingForm";

export default async function SettingsPage()
{
    const session = await auth();
    if (!session?.user?.email){
        return 'not logged in!'
    }
    const profile = await prisma.profile.findFirst({
        where: {email: session.user.email},
    });
    
    return (
        <div className="max-w-xs mx-auto" >
            <h1 className="text-2xl font-bold mb-5 mt-2 text-center" >
                Profile settings
            </h1>
            <p className="text-gray-500 text-xs text-center -mt-4 mb-3">
                {session.user.email}
            </p>
            <SettingsForm 
                profile={profile} />
                <div className="flex justify-center mt-4 pt-4 border-t border-gray-300">
                    <form
                    className="flex flex-col justify-center"
                        action={async () => {
                            "use server"
                            await signOut();
                        }}>
                        <Button type="submit">
                            Logout
                        </Button>
                    </form>
                </div>
        </div>
    );
}