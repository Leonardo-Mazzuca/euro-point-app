import { useLayoutContext } from "@/context/layout-context";
import { useNewsletter } from "./use-newsletter"
import { usePosts } from "./use-posts";
import { useProjects } from "./use-projects";
import { useEffect, useState } from "react";


export const useAllPublications = () => {


    const {newsletters} = useNewsletter();
    const {posts} = usePosts();
    const {projects} = useProjects();
    const {currentUser} = useLayoutContext();

    const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([]);
    const [currentUserProjects, setCurrentUserProjects] = useState<Project[]>([]);
    const [currentUserNewsletters, setCurrentUserNewsletters] = useState<Newsletter[]>([]);

    useEffect(()=> {

        const currentUserPosts = posts.filter(post => post.user_id === currentUser?.id);
        const currentUserProjects = projects.filter(project => project.user.id === currentUser?.id);
        const currentUserNewsletters = newsletters.filter(newsletter => newsletter.user.id === currentUser?.id);
        
        setCurrentUserPosts(currentUserPosts);
        setCurrentUserProjects(currentUserProjects);
        setCurrentUserNewsletters(currentUserNewsletters);

    },[posts, projects, newsletters])

    return {
        currentUserPosts,
        currentUserProjects,
        currentUserNewsletters
    }


}