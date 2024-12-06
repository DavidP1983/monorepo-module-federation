import React, { useState } from "react"
import { adminRoutes } from '@packages/shared/src/route/admin';
import { shopRoutes } from '@packages/shared/src/route/shop';

// import './App.scss';


import classes from '@/style/App.module.scss';
import { Outlet, Link } from "react-router-dom";


export const App = () => {
    const [counter, setCounter] = useState<number>(0);

    const handleIncrese = () => setCounter((counter) => counter + 1);



    return (
        <div>
            <div>
                <h1>Page HOST</h1>
                <div>
                    <Link to={adminRoutes.about}>About</Link>
                    <br />
                    <Link to={shopRoutes.main}>Shop</Link>
                    <br />
                    <Outlet />
                    {/* 
                    <div id="detail">
                        <Outlet />
                    </div> */}
                    {/* 
                    <button onClick={handleIncrese} className={classes.btn}>increase</button>
                    <div className={classes.title}>Hello</div>
                    <div>Counter: {counter}</div> */}
                    {/* <div id="detail">
                        <Outlet />
                    </div> */}
                </div >
            </div>

        </div>
    )
}