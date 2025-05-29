'use client'
import { DeleteComment } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteCommentForm({id}:{id:string}){
    const router = useRouter();
    return (
        <form action={async(data:FormData)=>{
            await DeleteComment(data);
            router.refresh();
        }}>
            <input type="hidden" name="id" value={id} />
            <button type="submit">
                <Trash2Icon size={20} className="mt-5"/>
            </button>
        </form>
    )
}