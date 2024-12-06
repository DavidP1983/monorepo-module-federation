import React, { useState } from "react"

// import './App.scss';


import classes from '@/style/App.module.scss';
import { Outlet, Link } from "react-router-dom";
import Contacts from "@/pages/Contacts";


export const App = () => {
    const [counter, setCounter] = useState<number>(0);

    const handleIncrese = () => setCounter((counter) => counter + 1);



    return (
        <div >
            <div>
                <h1>Page SHOP</h1>
                <div>
                    <button onClick={handleIncrese} className={classes.btn}>increase</button>
                    <div className={classes.title}>Hello</div>
                    <div>Counter: {counter}</div>
                    <div id="detail">
                        <Outlet />
                    </div>
                    <Contacts />
                </div >
            </div>

        </div>
    )
}