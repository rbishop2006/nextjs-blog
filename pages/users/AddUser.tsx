import React, { useState } from 'react'
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { User } from "./UserList";
import styles from "./userstyles.module.css"

const AddUser = () => {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [website, setWebsite] = useState("")
    const [city, setCity] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [newUser, setNewUser] = useState<User | null>(null)


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const localHost = 'http://localhost:3000'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, company, website, city, email, phone })
        };
        const postUser = async () => {
            const res = await fetch(`${localHost}/api/users/adduser`, requestOptions)
            const resJSON = await res.json()
            setNewUser(resJSON)
        }
        postUser()
    }

    return (
            <Layout>
                <Head>
                    <title>Add User Form</title>
                </Head>
                {
                    !newUser
                    ? <section>
                        <h2 className={"text-center"}>New User Info</h2>
                        <form onSubmit={handleSubmit} className={"flex flex-col"}>
                            <input placeholder={"Name:"} className={styles.newUserInputs} type="text" value={name} onChange={e => setName(e.target.value)}/>
                            <input placeholder={"Company:"} className={styles.newUserInputs} type="text" value={company} onChange={e => setCompany(e.target.value)}/>
                            <input placeholder={"Website:"} className={styles.newUserInputs} type="text" value={website} onChange={e => setWebsite(e.target.value)}/>
                            <input placeholder={"City:"} className={styles.newUserInputs} type="text" value={city} onChange={e => setCity(e.target.value)}/>
                            <input placeholder={"Email:"} className={styles.newUserInputs} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <input placeholder={"Phone:"} className={styles.newUserInputs} type="number" value={phone} onChange={e => setPhone(e.target.value)}/>
                            <input className={"mt-4 py-2 px-4 rounded w-2/5 m-auto  hover:text-white hover:bg-indigo-200 font-bold text-gray-600"} type="submit" value="Add user" />
                        </form>
                    </section>
                    :  <section className={"flex flex-col items-center"}>
                            <div className={"mt-8"}>
                                <p><strong>{newUser.name}</strong></p>
                                <p className={"mt-4"}>Company: {newUser.company.name}</p>
                                <p className={"mt-1"}>Website: {newUser.website}</p>
                                <p className={"mt-1"}>City: {newUser.address.city}</p>
                                <p className={"mt-1"}>Email: {newUser.email}</p>
                                <p className={"mt-1"}>Phone: {newUser.phone}</p>
                            </div>
                        </section>
                }

                <div className={"text-center"}>
                    <Link href="/users/UserList">
                        <a className={"btn-purple mt-8"}>← Back to Users</a>
                    </Link>
                </div>
            </Layout>
    );
}

export default AddUser

