import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams:{query},
}:{
    searchParams:{query:string},
}){
    return(
        <div className="w-full">
            <div className="max-w-md mx-auto">
                <SearchForm/>
                    {typeof query !== 'undefined' && (
                        <Suspense fallback="Loading...">
                            <SearchResult query={query}/>
                        </Suspense>
                    )}
            </div>
        </div>
    )
}