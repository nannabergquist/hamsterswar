import { response } from 'express';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    p: `text-center p-2`,
};

export default function Battle() {
    const [input, setInput] = useState({})

    const getHamsters = async (e) => {
        const url = await fetch("http://localhost:1010/hamsters");
        useEffect(() => {
            fetch(url)
                .then(res => res.json())
                .then(data => setInput(data))
        }, [])

    }


    return (
        <div className={style.bg}>
            <div className={style.container}>
                <h2 className={style.heading}>Tävla</h2>
                <form className={style.form}>
                    <p className={style.p}> Rösta genom att klicka på bilden som du tycker är mest gullig.</p>
                </form>
                <form>
                    {
                        getHamsters.map((hamsters, id) =>
                            (<h1>{hamsters.name}</h1>))
                    }
                </form>
                {/* <p>Ny bild?<Link to="/Battle">Klicka här.</Link></p> */}
            </div>
        </div >
    )
}