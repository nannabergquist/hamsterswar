import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db } from '../firebase';
import { query, onSnapshot, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    form: `bg-white rounded px-8 pt-6 pb-8 mb-4`,
    article: `grid grid-cols-3 gap-3`,
};

// const baseURL = "http://localhost:1010/hamsters";
const baseURL = process.env.REACT_APP_BASE_URL

function AllHamsters() {
    const [hamstersInfo, setHamstersInfo] = useState(null);
    const [firebaseConnect, setFirebaseConnect] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setHamstersInfo(response.data);
        });
        // const fetchFirebase = () => {
        //     const q = query(collection(db, 'hamsters'))
        //     //tar en bild (snapshot) på vår firebase så att vi kan rendera ut på vår skärm.
        //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //         let hamstersArr = []
        //         querySnapshot.forEach((doc) => {
        //             hamstersArr.push({ ...doc.data(), id: doc.id })
        //         });
        //         setFirebaseConnect(hamstersArr)
        //     })
        //     return () => unsubscribe
        // }
    }, []);

    // if (!hamstersInfo) return null;

    //delete Hamster
    const Delete = async (id) => {
        await deleteDoc(doc(db, 'hamsters', id))
    };

    console.log(baseURL);

    return (
        <div className={style.bg}>
            {baseURL}
            <article className={style.article}>
                {
                    hamstersInfo.list.map((hamster, index) => (
                        <div>
                            {/* <img width={250} src={hamster.imgName[0].downloadURL} alt="random-hamster" /> */}
                            <h1 key={index}>{hamster.name}</h1>
                            {/* <button onChange={() => setDeleteHamster(hamster.id)}>{<FaRegTrashAlt />}</button> */}
                        </div>
                    ))
                }

            </article>

        </div>
    )
}
export default AllHamsters;