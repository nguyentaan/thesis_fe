"use client";

import React, { createContext, useMemo } from "react";
import { create } from "zustand";

const initialFormValues = {
    name: "",
    email: "",
    password: "123455678",
    isAdmin: false,
    phone: "",
    avatar: "",
};

// Create the context
export const Context = createContext(null);

export const NewUserProvider = ({ children }) => {
    const useStore = useMemo(
        () =>
            create((set) => ({
                user: initialFormValues,
                setUser: (payload) =>
                    set((state) => ({ ...state, user: payload })),
            })),
        []
    );

    const store = useStore();
    return <Context.Provider value={store}>{children}</Context.Provider>;
};
