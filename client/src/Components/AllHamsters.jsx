import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
    form: `bg-white rounded px-8 pt-6 pb-8 mb-4`,
    img: `grid grid-rows-4 grid-flow-col gap-4 border p-2 ml-1 text-slate-100 flex`,
    text: `flex justify-between bg-slate-200 p-4 my-2 capitalize`
};

const AllHamsters = ({ deleteHamsters, hamster, index }) => {

    if (!hamster || !hamster.imgName) return null;

    return (
        <div className={style.form}>
            <img className={style.img} src={hamster.imgName[0].downloadURL} alt="random-hamster" />

            <div className={style.text}>
                <h1 key={index}>{hamster.name}</h1>
                <p>{hamster.age}</p>
                <p>{hamster.favFood}</p>
                <button onClick={() => deleteHamsters(hamster.id)}>{<FaRegTrashAlt />}</button>
            </div>
        </div>
    )
}
export default AllHamsters;