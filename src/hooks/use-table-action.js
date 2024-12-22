
import { useContext } from "react";
import { TableActionContext } from "../providers/table-action-provider";

function useTableAction() {
    const context = useContext(TableActionContext);
    if (!context) {
        throw new Error(
            "useTableAction must be used within a TableActionProvider"
        );
    }
    return context;
}

export default useTableAction;