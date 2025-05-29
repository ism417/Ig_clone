'use client'
import { DeleteStory } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteStoryForm({id}:{id:string}){
    const router = useRouter();
    return (
        <form action={async(data:FormData)=>{
            await DeleteStory(data);
            // router.refresh();
            router.push('/');
        }}>
            <input type="hidden" name="id" value={id} />
            <button type="submit">
                <Trash2Icon size={20} className="mr-5 mt-2"/>
            </button>
        </form>
    )
}