import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { query, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    p: `text-center p-2`,
    article: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    arrowBack: `border p-4 ml-2 bg-purple-500 rounded text-slate-100 flex justify-between`,
    infoBox: `border p-4 ml-2 bg-purple-500 text-slate-100`
};

const baseURL = process.env.REACT_APP_GETRANDOM;

const Battle = () => {
    const [battleHamsters, setBattleHamsters] = useState(null);
    const [chooseCutest, setChooseCutest] = useState(null);
    const [allHamsters, setAllHamsters] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setBattleHamsters(response.data);
        });
    }, []);

    //läsa av hamsters från firebase 
    useEffect(() => {
        console.log("vald hamster", chooseCutest);
        const q = query(collection(db, 'hamsters'))
        //tar en bild (snapshot) på vår firebase så att vi kan rendera ut på vår skärm.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let hamstersArr = []
            querySnapshot.forEach((doc) => {
                hamstersArr.push({ ...doc.data(), id: doc.id })
            });
            setAllHamsters(hamstersArr)
        })
        return () => unsubscribe
    }, []);

    if (!battleHamsters) return null;

    // console.log(allHamsters);

    const refreshPage = () => {
        window.location.reload();
    }

    const winner = async (winnerHamster) => {
        console.log("vald hamster:", winnerHamster);
        setChooseCutest(winnerHamster);

        const firebaseHamster = allHamsters.find(hamster => hamster.name === winnerHamster.name);
        console.log(firebaseHamster)

        const response = await updateDoc(doc(db, 'hamsters', firebaseHamster.id), {
            wins: firebaseHamster.wins++,
            games: firebaseHamster.games++
        })

        const loser = battleHamsters.list.filter((hamster) => hamster.id !== winnerHamster.id);
        const firebaseLoser = allHamsters.find(hamster => hamster.name === loser[0].name);
        console.log('Response: ', response)

        await updateDoc(doc(db, 'hamsters', firebaseLoser.id), {
            defeats: firebaseLoser.defeats++,
            games: firebaseLoser.games++
        })

    }

    return (
        <div className={style.bg}>
            <div className={style.container}>
                <Link to="/"><button className={style.arrowBack}>{<BsFillArrowLeftSquareFill />}</button></Link>
                <h2 className={style.heading}>Tävla</h2>
                <form className={style.form}>
                    <p className={style.p}> Rösta genom att klicka på bilden som du tycker är mest gullig.</p>
                </form>
                <article className={style.article}>
                    {
                        battleHamsters.list.map((hamster, index) => (
                            <div onClick={() => winner(hamster)} key={hamster.id}>
                                <img width={250} src={hamster.imgName[0].downloadURL} alt="random-hamster" />
                                <h1 key={index}>{hamster.name}</h1>
                            </div>
                        ))}
                </article>

                <div className={style.infoBox}>
                    {
                        chooseCutest ? "Du valde " + chooseCutest.name + " som mest gullig." : null
                    }
                </div>

                <p onClick={refreshPage}>Klicka här för ny battle!</p>
            </div>
        </div >
    )
}
export default Battle;