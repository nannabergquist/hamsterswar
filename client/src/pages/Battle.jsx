import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [chooseCutest, setChooseCutest] = useState()

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setHamstersInfo(response.data);
        });
    }, []);

    if (!hamstersInfo) return null;

    console.log(hamstersInfo);

    const refreshPage = () => {
        window.location.reload();
    }

    function winner(winnerHamster) {
        //check winner hamster
        setChooseCutest(winnerHamster);
        winnerHamster.wins = winnerHamster.wins + 1;
        //uppdatera hamstern i db

        //check loser hamster
        let loser = hamstersInfo.list.filter((hamster) => hamster._id !== winnerHamster._id);
        loser.losses = loser.losses + 1;
        //uppdatera hamstern i db
    }

    // const updateWinner = async (e) => {
    //     e.preventDefault()
    //     if (input === '') {
    //         alert('Please enter a valid message')
    //         return
    //     }
    //     const { uid, displayName } = auth.currentUser
    //     await addDoc(collection(db, 'messages'), {
    //         text: input,
    //         name: displayName,
    //         uid,
    //         timestamp: serverTimestamp()
    //     })
    //     setInput('')
    // }

    return (
        <div className={style.bg}>
            <div className={style.container}>
                <h2 className={style.heading}>Tävla</h2>
                <form className={style.form}>
                    <p className={style.p}> Rösta genom att klicka på bilden som du tycker är mest gullig.</p>
                </form>
                <article className={style.article}>
                    {
                        hamstersInfo.list.map((hamster, index) => (
                            <div onClick={() => winner(hamster)}>
                                <img width={250} src={hamster.imgName[0].downloadURL} alt="random-hamster" />
                                <h1 key={index}>{hamster.name}</h1>
                            </div>
                        ))};
                </article>

                <div>
                    <h2>{chooseCutest ? chooseCutest.name : null}</h2>
                </div>

                <p onClick={refreshPage}>Klicka här för ny battle!</p>
            </div>
        </div >
    )
}