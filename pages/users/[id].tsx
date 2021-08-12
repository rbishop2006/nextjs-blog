import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import Head from "next/head";
import useSWR from 'swr'
import Link from "next/link";
import React from "react";

const fetcher = async (url:string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const CurrentUser = () => {
    const { query } = useRouter()
    const router = useRouter()
    const { data, error } = useSWR(`/api/users/${query.id}`, fetcher)

    const handleDelete = (e:React.SyntheticEvent) => {
        e.preventDefault()
        const deleteUser = async () => {
            fetch(`/api/users/deleteuser`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: `${data.id}`
                    })
                }).then(res => {
                if(res.ok) router.push('/users/UserList')
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
                <p className={"mt-8"}>
                    <strong >{data.name}</strong>
                    <br/>
                    <small className={"mt-8"}>Company: {data.company.name}</small>
                    <br/>
                    <small>Website: {data.website}</small>
                    <br/>
                    <small>City: {data.address.city}</small>
                    <br/>
                    <small>Email: {data.email}</small>
                    <br/>
                    <small>Phone: {data.phone}</small>
                </p>
            </section>
            <div className={"text-center flex flex-col items-center justify-center"}>
                    <button className={"btn-purple mt-8 block"} onClick={(e) => handleDelete(e)}>✗ Delete user</button>
                <Link href="/users/UserList">
                    <a className={"btn-purple mt-8"}>← Back to Users</a>
                </Link>
            </div>
        </Layout>
    )
}

export default CurrentUser

