import React, {useEffect, useState, useRef} from 'react'
import {useRouter} from "next/router";

const Car: React.FC = () => {
    const [car, setCar] = useState<Car | ''>('')
    const router = useRouter()
    const {id} = router.query
    const isFetching = useRef<boolean>(false)

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
    }, [])

    const handleDelete = async () => {
        if (car && car.id) {
            fetch(`http://localhost/api/car/${car.id}`, {
                headers: {
                    Accept: 'application/json'
                },
                method: "DELETE"
            })
            router.push('/')
        }
    }

    return (
        <>
            {car &&
            <div>
                <p>Name: {car.name}</p>
                <p>id: {car.id}</p>
                <p>created: {car.created_at}</p>
                <p>updated: {car.updated_at}</p>
                <button onClick={handleDelete}>delete</button>
            </div>
            }
        </>

    )
}

export default Car;