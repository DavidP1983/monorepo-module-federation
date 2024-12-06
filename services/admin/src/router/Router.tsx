import { App } from "@/components/app/App";
import { AboutLazy } from "@/pages/about/About.lazy";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";


const routes = [
    {
        path: "/admin",
        element: <App />,
        children: [
            {
                path: "/admin/about",
                element: <Suspense fallback='Loading...'><AboutLazy /></Suspense>,
            },

        ],
    },
]

export const router = createBrowserRouter(routes);
export default routes;