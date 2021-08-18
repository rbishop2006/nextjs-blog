import React, {useEffect, useState, useRef} from 'react'
import {useRouter} from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";

const Car: React.FC = () => {
    const [car, setCar] = useState<Car | ''>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const isFetching = useRef<boolean>(false)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        isFetching.current = true
        const fetchCar = async () => {
            const carRes = await fetch(`http://localhost/api/car/${id}`, {
                headers: {
                    Accept: 'application/json'
                },
            })
            const car: Car = await carRes.json()
            setCar(car)
        }
        try {
            if (isFetching.current && id) fetchCar()

        } catch (e) {
            console.log(e)
        }
        return () => {
            isFetching.current = false
        }
    }, [isEditing, id])

    const handleDelete = async () => {
        const res = await fetch(`http://localhost/api/car/${id}`, {
            headers: {
                Accept: 'application/json'
            },
            method: "DELETE"
        })
        if (res.ok) {
            await router.push('/')
            setCar('')
        }
    }

    const handleEdit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const res = await fetch(`http://localhost/api/car/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                name
            })
        })
        if (res.ok) {
            setIsEditing(false)
            setName('')
        }
    }

    return (
        <Layout>
            <Head>
                <title>Car Details</title>
            </Head>
            {car &&
            <div className="pt-4">
                <p>Name: {car.name}</p>
                {isEditing &&
                <form onSubmit={handleEdit} className="flex items-center justify-between py-4">
                    <input className="flex-grow mr-4 py-2 pl-2" type="text" placeholder="enter new name" value={name}
                           onChange={e => setName(e.target.value)}/>
                    <button className="btn-green" type="submit" disabled={name.length < 5}>submit</button>
                </form>
                }
                <p>
                    <small>
                        created: <Date dateString={car.created_at}/>
                    </small>
                </p>
                <p>
                    <small>
                        updated: <Date dateString={car.updated_at}/>
                    </small>
                </p>
                <div className="flex items-center justify-between pt-4">
                    <button className="btn-yellow" onClick={() => setIsEditing(prevState => !prevState)}>edit</button>
                    <button className="btn-red" onClick={handleDelete}>delete</button>
                </div>

            </div>
            }
        </Layout>

    )
}

export default Car;