import { useLayoutContext } from "@/context/layout-context";
import { useEffect, useState } from "react";

type Props = {
    item: Post | Newsletter | Project
    item_id_array: "saved_posts_ids" | "saved_newsletter_ids" | "saved_projects_ids"
}
export const useSave = ({item,item_id_array}:Props) => {

    const {currentUser} = useLayoutContext();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const itemIsSaved = currentUser?.[item_id_array]?.includes(item.id);
        setIsSaved(!!itemIsSaved);
      }, [currentUser, item.id]);

    return {
        isSaved
    }

}