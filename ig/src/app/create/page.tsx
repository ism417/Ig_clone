'use client'
import { createPost } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { Send, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatPage(){
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
            }).then(response => {
                response.json().then(url => {
                    setImageUrl(url);
                })
            });
        }
    })
    return(
        <form action={async data => {
           const id =  await createPost(data);
            router.push(`/posts/${id}`);
            router.refresh();
        }}>
            <input type="hidden" name="image" value={imageUrl} />
            <div className="flex flex-col gap-4 *:items-center *:justify-center">
                <div className="flex" >
                    <div className={`relative ${imageUrl ? 'w-1/2' : 'size-64'} bg-gray-400 p-2 rounded-md`}>
                        { imageUrl && (
                            <img src={imageUrl} className=" rounded-md" alt="" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <input 
                                onChange={ev => setFile(ev.target.files?.[0]||null)}
                                className="hidden" 
                                type="file"
                                ref={fileInRef} />
                            <Button 
                                onClick={() => fileInRef?.current?.click()}
                                type="button"
                                variant="surface">
                                <UploadCloud size={16}/>
                                Choose image
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 ">
                    <TextArea name="description" className={`${imageUrl ? 'w-1/2' : 'w-64'}`} placeholder="Add photo description..."/>
                <div className="flex mt-2 justify-center">
                    <Button>
                        Publish
                        <Send size={16}/>
                    </Button>
                </div>
                </div>
            </div>
        </form>
    )

}