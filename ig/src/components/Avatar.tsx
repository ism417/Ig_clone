import Image from "next/image";

export default function Avatar({src}:{src:string})
{
    return(
        <div className="size-14 aspect-square overflow-hidden rounded-full"> 
            <Image  
                className="object-cover w-full h-full"
                src={src || ''} 
                alt="avatar" />
        </div>
    )
}