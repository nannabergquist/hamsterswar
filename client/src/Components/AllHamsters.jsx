import React from 'react';
import axios from 'axios';


const style = {
    form: `bg-white rounded px-8 pt-6 pb-8 mb-4`,
    article: `grid grid-cols-3 gap-3`,
};

const baseURL = "http://localhost:1010/hamsters";

function AllHamsters() {
    const [hamstersInfo, setHamstersInfo] = React.useState(null);



    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setHamstersInfo(response.data);
        });
    }, []);

    if (!hamstersInfo) return null;

    return (
        <div>
            <article className={style.article}>
                {
                    hamstersInfo.list.map((hamsters, index) => (
                        <div>
                            <img width={250} src={hamsters.imgName[0].downloadURL} alt="random-hamster" />
                            <h1 key={index}>{hamsters.name}</h1>
                        </div>
                    ))};
            </article>
        </div>
    )
}
export default AllHamsters;