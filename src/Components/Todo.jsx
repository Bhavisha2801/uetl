import React from "react";

const Todo = () => {

    const [title , setTitle] = React.useState("")
    const [data , setData] = React.useState([])
    const [page , setPage] = React.useState(0)


    React.useEffect(() => {
        getData()
    },[page])

    const getData = () => {
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
        .then((res) => res.json())
        .then((res) => setData(res))
    }


    const handleAdd = () => {
        const payload = {
            title:title,
            status : false
        }

        const payloadjson = JSON.stringify(payload)

        fetch(`http://localhost:3001/todos`,{
            method : "POST",
            body : payloadjson,
            headers : {
                "content-type" : "application/json"
            }
        })
        .then((res) => {
            getData()
        })
    }

    return (
        <div>
            <input placeholder="Add Something"  value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleAdd}>ADD</button>
            {
                data.map((item) => <div key={item.id} >{item.title}</div>)
            }
            <button onClick={() => setPage(page - 1)} disabled={page === 0} >PREV</button>
            <button onClick={() => setPage(page + 1)} disabled={data.length < 4} >NEXT</button>
            
        </div>
    )
}

export {Todo}