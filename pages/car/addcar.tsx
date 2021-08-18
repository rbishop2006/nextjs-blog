import React, {useState} from 'react'
import {useRouter} from "next/router";
import Link from "next/link";
import Layout, {siteTitle} from "../../components/layout";
import Head from "next/head";

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
        <Layout>
            <Head>
                <title>Add Car</title>
            </Head>
            <form onSubmit={handleSubmit} className="flex items-center justify-between pt-4">
                <input className="flex-grow mr-4 py-2 pl-2" type="text" placeholder="add car name" value={name}
                       onChange={e => setName(e.target.value)}/>
                <input type="submit" className="btn-green" disabled={name.length < 5}/>
            </form>
        </Layout>
    )
}

export default AddCar