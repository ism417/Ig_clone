import { getSessionEmailOrThrow } from "@/actions";
import DeleteStoryForm from "@/components/DeleteStory";
import ModalStory from "@/components/ModalStory";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function StoryPage({params}:{params:Promise<{id :string}>}){
    const {id} = await params;
    const sessionEmail = await getSessionEmailOrThrow();
    const story = await prisma.story.findFirst({
        where:{
            id:id,
        }
    })
    const profile = await prisma.profile.findFirst({
        where:{
            email:story?.author,
        }
    })
    const storys = await prisma.story.findMany({
        where:{
            author:profile?.email
        },
        orderBy: {
            createdAt: 'desc', // Get the latest story for each author
        }
    })
    const currentIndex = storys.findIndex((story) => story.id === id);
    const prevStoryId = currentIndex > 0 ? storys[currentIndex - 1].id : null;
    const nextStoryId = currentIndex < storys.length - 1 ? storys[currentIndex + 1].id : null;
    return(
        <ModalStory>
            <div className="bg-black/30 w-100 pb-5 pt-2 rounded-lg">
                <div className="flex justify-between">
                    <div>
                        {prevStoryId && (
                            <Link href={ `/storys/${prevStoryId}`}>
                                <ChevronLeft className="text-white"/>
                            </Link>
                        )}
                    </div>
                    <div>
                        {nextStoryId && (
                            <Link href={`/storys/${nextStoryId}`}>
                                <ChevronRight className="text-white"/>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 mb-2 ml-5">
                    <Avatar 
                        size="4"
                        radius="full"
                        fallback={'avatar'} 
                        src={profile?.avatar || ''} />
                    <div className="w-full">
                        <div className="text-white flex justify-between">
                            <div>
                                <h2>{profile?.name}</h2>
                                <p className="text-gray-400 text-sm">
                                    {profile?.username}
                                </p>
                            </div>
                            {sessionEmail === story?.author && (
                                <DeleteStoryForm id={id}/>
                                )}
                        </div>

                    </div>
                </div>
                <Image src={story?.image||""} alt="image" className="w-90 ml-5"/>
            </div>
        </ModalStory>
    )
}