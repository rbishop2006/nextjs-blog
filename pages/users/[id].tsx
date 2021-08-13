import {useRouter} from 'next/router'
import Layout from "../../components/layout";
import Head from "next/head";
import useSWR from 'swr'
import Link from "next/link";
import React from "react";

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const CurrentUser = () => {
    const {query} = useRouter()
    const router = useRouter()
    const {data, error} = useSWR(`/api/users/${query.id}`, fetcher)

    const handleDelete = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const deleteUser = async () => {
            fetch(`/api/users/deleteuser`,
                {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        userId: `${data.id}`
                    })
                }).then(res => {
                if (res.ok) router.push('/users/UserList')
            })
        }
        deleteUser()
    }


    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout>
            <Head>
                <title>{`User ${data.id}`}</title>
            </Head>
            <section className={"flex flex-col items-center"}>
                <div className={"mt-8"}>
                    <h2>{data.name}</h2>
                    <p className={"mt-4"}>Company: {data.company.name}</p>
                    <p>Website: {data.website}</p>
                    <p>City: {data.address.city}</p>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.phone}</p>
                </div>
            </section>
            <div className={"text-center flex flex-col items-center justify-center"}>
                <button className={"btn-red mt-8"} onClick={(e) => handleDelete(e)}>✗ Delete user</button>
                <Link href="/users/UserList">
                    <a className={"btn-blue mt-8"}>← Back to Users</a>
                </Link>
            </div>
        </Layout>
    )
}

export default CurrentUser

