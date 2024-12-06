import { App } from "@/components/app/App";
import { ShopLazy } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { UserCard } from '@packages/shared/src/components/UserCard';


const routes = [
    {
        path: "/shop",
        element: <App />,
        children: [

            {
                path: "/shop/main",
                element: <Suspense fallback='Loading...'><ShopLazy /></Suspense>,
            },
            {
                path: "/shop/second",
                element: <Suspense fallback='Loading...'><UserCard username="FROM SHOP" /></Suspense>,
            },


        ],
    },
]

export const router = createBrowserRouter(routes);
export default routes;