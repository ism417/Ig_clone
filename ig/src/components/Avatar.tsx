export default function Avatar({src}:{src:string})
{
    return(
        <div className="size-14 aspect-square overflow-hidden rounded-full"> 
            <img 
                className="object-cover w-full h-full"
                src={src || ''} 
                alt="avatar" />
        </div>
    )
}