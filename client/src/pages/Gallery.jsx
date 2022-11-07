import AllHamsters from '../Components/AllHamsters';
import Hamsters from '../Components/Hamsters';
import React from 'react';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { query, onSnapshot, collection, addDoc, deleteDoc } from 'firebase/firestore';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `bg-white rounded px-8 pt-6 pb-8 mb-4`,
    p: `text-center p-2`,
    article: `grid grid-cols-3 gap-3`,
    input: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
};

const Gallery = () => {
    const [firebaseConnect, setFirebaseConnect] = useState([]);
    const [input, setInput] = useState('');

    // lägg till en ny hamster
    const createHamster = async (e) => {
        e.preventDefault(e)
        if (input === '') {
            alert('Snälla skriv en valid hamster')
            return
        }
        await addDoc(collection(db, 'hamsters'), {
            name: input,
            age: input,
            favFood: input,
            id: input,
            imgName: input,
            loves: input,
        })
        //en tom sträng pga när du har skrivit klart så ska texten försvinna - ej stanna kvar.
        setInput('')
    }

    //läsa av hamsters från firebase 
    useEffect(() => {
        const q = query(collection(db, 'hamsters'))
        //tar en bild (snapshot) på vår firebase så att vi kan rendera ut på vår skärm.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let hamstersArr = []
            querySnapshot.forEach((doc) => {
                hamstersArr.push({ ...doc.data(), id: doc.id })
            });
            setFirebaseConnect(hamstersArr)
        })
        return () => unsubscribe
    }, []);

    console.log(firebaseConnect);

    return (
        <div>
            <AllHamsters />
            <form onSubmit={createHamster} className={style.form} action="">
                <h2>Lägg till en ny Hamster</h2>
                <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Namn" />
                {/* <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Ålder" />
                <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Gillar" />
                <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Favorit mat" /> */}
                {/* <input value={input} onChange={(e) => setInputImg(e.target.value)} className={style.input} type="" placeholder="Bild" /> */}
                <input type="submit" value="Log in" />
            </form>
            <ul>
                {firebaseConnect.map((hamsters, index) => (
                    <Hamsters key={index}
                        hamsters={hamsters} />
                ))}
            </ul>
        </div>
    )
}

export default Gallery;
