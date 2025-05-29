'use client'
import { Post } from '@prisma/client'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

export default function PostsGrid({posts}:{posts:Post[]}){
    return (
        <div className="max-w-4xl mx-auto"  >
            <Masonry
                breakpointCols={{
                    default: 4,
                    860: 3,
                    600: 2,
                }}
                className="flex -ml-4"
                columnClassName="pl-4">
                {posts.map(post =>(
                    <div key={post.id} className='mb-4'>
                        <Link href={`/posts/${post.id}`}>
                            <img
                                className='rounded-md' 
                                src={post.image} 
                                alt=""></img>
                        </Link>
                    </div>
                ))}
            </Masonry>
        </div>
    )
}