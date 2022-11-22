import AllHamsters from '../Components/AllHamsters';
import React from 'react';
import { db, storage } from '../firebase';
import { useState, useEffect } from 'react';
import { query, onSnapshot, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const style = {
    bg: `h-screen w-screen p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    hamsterBg: ` p-24 bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0] text-center`,
    arrowBg: `bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0]`,
    formBg: `bg-gradient-to-r from-[#2F80ED] to-[#1CB5e0]`,
    container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `bg-white max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
    p: `text-center p-2`,
    grid: `grid grid-cols-3 gap-3`,
    input: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100 hover:bg-purple-600`,
    arrowBack: `border p-4 ml-2 bg-purple-500 rounded text-slate-100 flex justify-between`
}

const Gallery = () => {
    const [hamsters, setHamsters] = useState([]);
    const [file, setFile] = useState("");
    const [data, setData] = useState({});

    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newFavfood, setNewFavfood] = useState('');
    const [newLoves, setNewLoves] = useState('');

    // lägg till en ny hamster
    const createHamster = async (e) => {
        e.preventDefault(e)
        await addDoc(collection(db, 'hamsters'), {
            name: newName,
            age: newAge,
            favFood: newFavfood,
            loves: newLoves,
        })
        uploadFile()
    };

    //läsa av hamsters från firebase 
    useEffect(() => {
        const q = query(collection(db, 'hamsters'))
        //tar en bild (snapshot) på vår firebase så att vi kan rendera ut på vår skärm.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let hamstersArr = []
            querySnapshot.forEach((doc) => {
                hamstersArr.push({ ...doc.data(), id: doc.id })
            });
            setHamsters(hamstersArr)
        })
        return () => unsubscribe
    }, []);


    const uploadFile = () => {
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData(downloadURL);
                });
            }, [file]
        )
    }


    console.log(hamsters);

    //delete Hamster
    const deleteHamsters = async (id) => {
        await deleteDoc(doc(db, 'hamsters', id))
    };

    return (
        <div>
            <div className={style.arrowBg}>
                <Link to="/"><button className={style.arrowBack}>{<BsFillArrowLeftSquareFill />}</button></Link>
            </div>
            <div className={style.formBg}>
                <form onSubmit={createHamster} className={style.form}>
                    <h2>Lägg till en ny Hamster</h2>
                    <input placeholder="Namn" onChange={(e) => setNewName(e.target.value)} className={style.input} />
                    <input placeholder="Ålder" onChange={(e) => setNewAge(e.target.value)} className={style.input} />
                    <input placeholder="Favorit mat" onChange={(e) => setNewFavfood(e.target.value)} className={style.input} />
                    <input placeholder="Älskar" onChange={(e) => setNewLoves(e.target.value)} className={style.input} />
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button type="submit" className={style.button}>Skicka</button>
                </form>
            </div>
            <div className={style.hamsterBg}>
                <ul className={style.grid}>
                    {hamsters.length !== 0 && hamsters.map((hamster, index) => (
                        <AllHamsters
                            key={index}
                            hamster={hamster}
                            deleteHamsters={deleteHamsters}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Gallery;
