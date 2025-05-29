'use client';
import { updateProfile } from "@/actions";
import { prisma } from "@/db";
import { Profile } from "@prisma/client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({
    profile,
}:{
    profile:Profile|null
}){
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || '');
    useEffect(() => {
        if (file)
        {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
              method: "POST",
              body: data,
            }).then(response => {
                response.json().then(url => {
                    setAvatarUrl(url);
                })
            });
        }
    },[file]);
    return (
        <form action={async (data:FormData)=> {
            await updateProfile(data);
            router.push('/profile');
            router.refresh();
        }}>
            <input type="hidden" name="avatar" value={avatarUrl || ''} />
            <div className="flex gap-4 items-center" >
                <div>
                    <div className="bg-gray-400 size-24 rounded-full overflow-hidden aspect-square shadow-md shadow-gray-500">
                        <img className="object-cover w-full h-full"  src={avatarUrl} alt="" />
                    </div>
                </div>
                <div>
                    <input
                        type="file" 
                        ref={fileInRef} 
                        className="hidden"
                        onChange={ev => setFile(ev.target.files?.[0] || null)}
                    />
                    <Button 
                        variant="surface"
                        type="button"
                        onClick={() => fileInRef.current?.click()}
                    >
                        <UploadCloud/>
                        Change avatar
                    </Button>
                </div>
            </div>
            <p className="mt-2 font-bold" > username </p>
            <TextField.Root
                name="username"
                defaultValue={profile?.username || ''}
                placeholder="your_username"/>
            <p className="mt-2 font-bold" >name </p> 
            <TextField.Root
                name="name"
                defaultValue={profile?.name || ''}
                placeholder="full_name"/>
            <p className="mt-2 font-bold" >subtitle </p> 
            <TextField.Root
                name="subtitle"
                defaultValue={profile?.subtitle || ''}
                placeholder="Graphic designer"/>
            <p className="mt-2 font-bold" > bio</p>
            <TextArea 
                name="bio" 
                defaultValue={profile?.bio || ''}/>
            <label className="flex items-center justify-center gap-2 mb-3">
                <span>Dark mode</span>
                <Switch 
                        defaultChecked={ localStorage.getItem('theme') == 'dark'}
                        onCheckedChange={(isDark) => {
                            const html = document.querySelector('html');
                            const theme = isDark ? 'dark' : 'light';
                            if(html) {
                                html.dataset.theme = theme;
                            }
                            localStorage.setItem('theme',theme);
                            window.location.reload();
                        }} 
                />
            </label>
            <div className="mt-3 flex justify-center" >
                <Button variant="solid"  >Save settings</Button>
            </div>
        </form>
    )
}