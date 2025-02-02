"use client";

import React, { createContext, useMemo } from "react";
import { create } from "zustand";

const initialFormValues = {
    name: "",
    category: "",
    color: "",
    description: "",
    total_stock: "0",
    price: "0",
    imageUrl: "",
    index_name: "",
};

// Create the context
export const Context = createContext(null);

export const NewProductProvider = ({ children }) => {
    const useStore = useMemo(
        () =>
            create((set) => ({
                product: initialFormValues,
                setProduct: (payload) =>
                    set((state) => ({ ...state, product: payload })),
            })),
        []
    );

    const store = useStore();
    return <Context.Provider value={store}>{children}</Context.Provider>;
};
