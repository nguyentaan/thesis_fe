"use client"

import React from 'react'
import { Context } from "../providers/new-product-provider"

// Hook to access Context that indirectly exposes the created store.
export const useNewProductProvider = () => {
    const ctx = React.useContext(Context);
    if (!ctx) throw Error(`Lack of provider`);
    return ctx;
};