"use client"

import React from 'react'
import { Context } from "../providers/new-user-provider"

// Hook to access Context that indirectly exposes the created store.
export const useNewUserProvider = () => {
    const ctx = React.useContext(Context);
    if (!ctx) throw Error(`Lack of provider`);
    return ctx;
};