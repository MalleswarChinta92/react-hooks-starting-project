import React, {useState, useMemo} from 'react';

const Memo = () => {

    const [number, setNumber] = useState(0)
    const [dark, setDark] = useState(false)
    const doubleNumber = useMemo(()=> slowFunction(number),[number])

    const themeStyles = {
        backgroundColor: dark ? '#333': '#ccc',
        color: dark ? '#ccc' : '#333',
        padding: '2rem',
        margin: '2rem'
    }

    return (
        <>
            <input type="number" value={number} onChange={e=>setNumber(parseInt(e.target.value))} />
            <button onClick={()=> setDark(prevDark=> !prevDark)}>Toggle</button>
            <div style={themeStyles}>{doubleNumber}</div>
        </>
    )

}

const slowFunction = (num) => {
    for (let i = 0; i < 1000000000; i++) {}
    return num*2;
}

export default Memo