import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    p: `text-center p-2`,
    article: `border p-4 ml-2 bg-purple-500 text-slate-100`,
};

const baseURL = "http://localhost:1010/hamsters/random";

export default function App() {
    const [hamstersInfo, setHamstersInfo] = React.useState(null);
    const [chooseCutest, setChooseCutest] = useState({})

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setHamstersInfo(response.data);
        });
    }, []);

    if (!hamstersInfo) return null;

    function chooseWinner() {

    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className={style.bg}>
            <div className={style.container}>
                <h2 className={style.heading}>Tävla</h2>
                <form className={style.form}>
                    <p className={style.p}> Rösta genom att klicka på bilden som du tycker är mest gullig.</p>
                </form>
                <article className={style.article}>
                    {
                        hamstersInfo.list.map((hamsters, index) => (
                            <div>
                                <img width={250} src={hamsters.imgName[0].downloadURL} alt="random-hamster" />
                                <h1 key={index}>{hamsters.name}</h1>
                            </div>
                        ))};
                </article>

                <p onClick={refreshPage}>Klicka här för ny battle!</p>
            </div>
        </div >
    )
}