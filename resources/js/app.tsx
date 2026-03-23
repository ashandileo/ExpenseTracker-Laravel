import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

createInertiaApp({
    title: (title) =>
        title ? `${title} - Expense Tracker` : "Expense Tracker",
    resolve: (name) => {
        // @ts-ignore
        const pages = import.meta.glob<{ default: React.ComponentType }>(
            "./Pages/**/*.tsx",
            { eager: true },
        );
        return (
            pages[`./Pages/${name}/index.tsx`] ?? pages[`./Pages/${name}.tsx`]
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
