
import Modal from "@/components/Modal";
import ModelPostCentent from "@/components/ModelPostContent";
import { Suspense } from "react";

export default async function PostInModal({params}:{params:Promise<{ id: string }>}){
    return(
       <Modal>
            <Suspense fallback="Loading...">
                <ModelPostCentent postId={(await params).id}/>
            </Suspense>
       </Modal>
    )
}