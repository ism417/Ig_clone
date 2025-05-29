import { auth } from "@/auth";
import ConversationList from "@/components/Conversation";
import MessageForm from "@/components/MessageForm";
import MessageGrid from "@/components/MessageGrid";
import { prisma } from "@/db";
import { Avatar, Button,} from "@radix-ui/themes";
import Link from "next/link";

export default async function SingelConversation({params}:{params:Promise<{ id: string }>}){
    const { id } = await params;
    const session = await auth();
    const myProfile =  await prisma.profile
        .findFirst({where:{email:session?.user?.email as string}});
    const conver = await prisma.convo.findFirst({
        where:{
            id: id,
        }
    })
    
    const friend = await prisma.profile.findFirst({
        where:{
            AND:[
                {
                    id: {
                        not: myProfile?.id as string
                    }
                },
                {
                    id: {
                        in: [conver?.srcId as string, conver?.destId as string]
                    }
                }
            ]
        }
    });
    const messages = await prisma.message.findMany({
        where:{
            convoId:id
        }
    })
    return(
        <div className="flex flex-col-2">
            <ConversationList/>
            <div className="flex-col-1 h-screen w-full border-l border-l-gray-400">
                <div className="  sm:max-h-285 lg:max-h-295  py-3 -mr-4 h-full overflow-y-auto">
                    <div className="py-1  flex flex-col items-center" >
                        <Avatar 
                            size="6"
                            radius="full"
                            fallback={'avatar'} 
                            src={friend?.avatar || ''}
                        />
                        <h1 className="text-xl font-bold">{friend?.name}</h1>
                        <p className="text-gray-500 mt-1 mb-1"  > {friend?.username}</p>
                        <Link href={`/users/${friend?.username}`}>
                            <Button className="font-bold" >View profile</Button>
                        </Link>
                    </div>
                    <MessageGrid messages={messages} myProfile={myProfile} friend={friend} id={id}/>
                </div>
                <div className="fixed left-2/3 transform -translate-x-1/2 flex justify-center items-center bottom-0 lg:mb-0 sm:mb-10 bg-white dark:bg-gray-950">
                    <MessageForm convoId={id}/>
                </div>
            </div>
        </div>
    )
}