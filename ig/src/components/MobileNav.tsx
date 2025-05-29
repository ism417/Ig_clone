'use client'
import { CameraIcon, HomeIcon, LayoutDashboard, LucideGrid, Search, Send, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
export default function MobileNav(){
  const path  = usePathname();
  const profileActive = path.includes('profile');
  const createActive  = path.includes('create');
  const messageActive = path.includes('messages') || path.includes('dms');
  const browseActive  = path.includes('browse');
  const searchActive  = path.includes('search');
  const homeActive = !path.includes("posts") && !path.includes("users") &&  !profileActive && !createActive && !messageActive && !browseActive && !searchActive;

    return(
        <div className="block lg:hidden fixed bottom-0 bg-white dark:bg-slate-900 px-8 py-2 left-0 right-0">
        <div className="max-w-sm mx-auto flex justify-between text-gray-600">
        <a href="/">
              <HomeIcon className={homeActive ? "text-red-600":""}/>
            </a>
            <a href="/profile">
              <User2Icon className={profileActive ? "text-red-600":""}/>
            </a>
            <a href="/create">
              <CameraIcon className={createActive ? "text-red-600":""}/>
            </a>
            <a href="/messages">
              <Send className={messageActive ? "text-red-600":""}/>
            </a>
            <a href="/browse">
              <LayoutDashboard className={browseActive ? "text-red-600":""}/>
            </a>
            <a href="/search">
              <Search className={searchActive ? "text-red-600":""}/>
            </a>
        </div>
      </div>
    );
}