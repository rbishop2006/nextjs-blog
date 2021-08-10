import {GetServerSideProps} from "next";
import Layout from "../../components/layout";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    return {
        props: { users }
    }
}


const UserList = ({ users }:UserProps) => {
    console.log(users)
    return (
        <Layout>
            <Head>
                <title>User List</title>
            </Head>
                <ul className={"mt-8 divide-y divide-blue-300"}>
                    {users.map((user) => (
                        <li key={user.id} className={"pt-4 pb-4"}>
                            <p>
                                <strong>User: {user.name}</strong>
                                <br/>
                                <small>Company: {user.company.name}</small>
                                <br/>
                                <small>Email: {user.email}</small>
                                <br/>
                                <small>Phone: {user.phone}</small>
                            </p>

                        </li>
                    ))}
                </ul>
        </Layout>
    )
}


export default UserList

interface Address {
    street:  string;
    suite:   string;
    city:    string;
    zipcode: string;
    geo:     Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name:        string;
    catchPhrase: string;
    bs:          string;
}

interface User {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface UserProps {
    users : User[]
}


