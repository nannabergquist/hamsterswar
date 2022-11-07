import React from 'react'

const Hamsters = ({ hamsters, toggleComplete }) => {
    return (
        <li>
            {/* <div>
                <input onChange={() => toggleComplete(hamsters)} type="text" />
                <p onChange={() => toggleComplete(hamsters)}>{hamsters.name}</p>
                <p onChange={() => toggleComplete(hamsters)}>{hamsters.age}</p>
                <p onChange={() => toggleComplete(hamsters)}>{hamsters.id}</p>
            </div> */}
            {/* <button onChange={() => deleteTodo(hamsters.id)}>{<FaRegTrashAlt />}</button>  */}
        </li>
    )
}

export default Hamsters