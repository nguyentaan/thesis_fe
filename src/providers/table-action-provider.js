import { createContext } from "react";

export const TableActionContext = createContext(null);

export const TableActionProvider = ({ initialValues, children }) => {
    return (
        <TableActionContext.Provider value={initialValues}>
            {children}
        </TableActionContext.Provider>
    );
};
