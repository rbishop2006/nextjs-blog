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
    const { data, error } = useSWR(`/api/users/${query.id}`, fetcher)


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
            <div className={"text-center"}>
                <Link href="/users/UserList">
                    <a className={"btn-purple mt-8"}>← Back to Users</a>
                </Link>
            </div>
        </Layout>
    )
}

export default CurrentUser

