import {GetServerSideProps} from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from 'next/link';
import React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
    const localHost = 'http://localhost:3000'
    const res = await fetch(`${localHost}/api/users/userList`)
    const users = await res.json()
    return {
        props: { users }
    }
}


const UserList = ({ users }:UserProps) => {
    return (
        <Layout>
            <Head>
                <title>User List</title>
            </Head>

                <h1 className={"text-center mt-8"}>User List</h1>
                <ul className={"mt-4 divide-y divide-blue-300"}>
                    {users.map((user) => (
                        <li key={user.id} className={"pt-4 pb-4"}>
                         <Link href="/users/[id]" as={`/users/${user.id}`}>
                             <a ><strong>{user.name}</strong> </a>
                         </Link>
                            <p>
                                <small>Company: {user.company.name}</small>
                                <br/>
                                <small>Email: {user.email}</small>
                                <br/>
                                <small>Phone: {user.phone}</small>
                            </p>

                        </li>
                    ))}
                </ul>
            <div className={"text-center"}>
                <Link href="/users/AddUser">
                    <a className={"btn-green mt-8"}>Add new user →</a>
                </Link>
            </div>
        </Layout>
    )
}


export default UserList

interface Address {
    street?:  string;
    suite?:   string;
    city:    string;
    zipcode?: string;
    geo?:     Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name:        string;
    catchPhrase?: string;
    bs?:          string;
}

export interface User {
    id:       number;
    name:     string;
    username?: string;
    email:    string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface UserProps {
    users : User[]
}


