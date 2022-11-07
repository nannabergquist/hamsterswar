import React from 'react'
import { Link } from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    p: `text-center p-2`,
};

export default function Landingpage() {
    return (
        <div className={style.bg}>
            <div className={style.container}>
                <h2 className={style.heading}>Hamsterwars</h2>
                <form className={style.form}>
                    <p className={style.p}>Hej och välkommen till Hamsterwars! <br /> <br /> Detta är en hemsida där matcher mellan två bilder slumpas fram och ni, besökarna röstar på den ni finner <strong>gulligast.</strong></p>
                </form>
                <div>
                    <Link to="/Battle"><button className={style.button}>Börja spela!</button></Link>
                    <Link to="/Gallery"><button className={style.button}>Se galleri</button></Link>
                </div>
            </div>
        </div>
    )
}