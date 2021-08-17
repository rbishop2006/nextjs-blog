import React, {useState} from 'react'
import {useRouter} from "next/router";

const AddCar: React.FC = () => {
    const [name, setName] = useState<string>('')
    const router = useRouter()
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetch(`http://localhost/api/car`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name
            })
        })
        setName("")
        router.push('/')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="add car name" value={name} onChange={e => setName(e.target.value)}/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default AddCar