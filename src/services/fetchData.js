import { LINK } from "../selectElements/selectElements";

export const fetchKanbanData = async () => {
    try {
        const kanbanData = await fetch(LINK);
        const list = await kanbanData.json();
        return list;
    } catch (err) {
        console.error("Error fetching data: ", err);
        throw err;
    }
};
