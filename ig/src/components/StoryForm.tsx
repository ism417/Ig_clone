'use client'
import { createStory } from "@/actions";
import { PlusIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ModalStory from "./ModalStory";
import { Button } from "@radix-ui/themes";

export default function StoryForm(){
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState<File| null>(null);
    const fileInRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    useEffect (() => {
        if (file) {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
              method: "POST",
              body: data,
            })
                .then(response => response.json())
                .then(url => {
                    setImageUrl(url);
                });
        }
    }, [file]);
    const handleSubmit = async (data: any) => {
        const id = await createStory(data);
        router.push(`/storys/${id}`);
    };
    return(
        <form onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(new FormData(e.target as HTMLFormElement));
        }}>
            <input type="hidden" name="image" value={imageUrl} />
            { imageUrl && (
                <ModalStory>
                    <div className="bg-black/30 w-100 py-5 rounded-lg">
                        <img src={imageUrl}  alt="image" className="w-90 ml-5"/>
                        <div className="flex justify-center mt-2">
                            <Button className="" >
                                Publish
                                <Send size={16}/>
                            </Button>
                        </div>
                    </div>
                </ModalStory>
            )}
            <input 
                onChange={ev => setFile(ev.target.files?.[0]||null)}
                className="hidden" 
                type="file"
                ref={fileInRef} />
            <button  
                onClick={() => fileInRef?.current?.click()}
                type="button"
                className="size-23 text-white flex justify-center items-center  bg-gradient-to-tr from-orange-300 to-red-600 rounded-full" >
                <PlusIcon size="40"/>
            </button>
        </form>
    )
}