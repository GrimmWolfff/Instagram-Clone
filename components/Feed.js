import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import MiniProfile from "./MiniProfile";
import { useSession } from "next-auth/react";

export default function Feed (){
    const { data: session } = useSession();
    return (
        <main className={`${!session ? 'hidden' : 'grid'} grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl-max-w-6xl max-auto`}>
            <section className="col-span-2">
                <Stories />
                <Posts />
            </section> 
            <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed">
                    <MiniProfile />
                    <Suggestions />    
                </div>
            </section> 
        </main>
    );
}