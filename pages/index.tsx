import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import Date from "../components/date";
import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {

    const carsResp = await fetch(`http://localhost/api/car`, {
        headers: {
            Accept: 'application/json'
        }
    })

    const cars: Car[] = await carsResp.json()

    return {
        props: {
            cars
        }
    }
}

const Home: React.FC<HomeProps> = ({cars}) => {
    const router = useRouter()

    useEffect(() => {
        //data was not refreshing when pushing from other pages
        // there may be a better solution
        router.replace(router.asPath)
    }, [])

    return (
        <div>
            <Layout home>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={"mt-8 text-center"}>
                    <p>Hello, I&apos;m Rob. I&apos;m practicing Next.js with Laravel.</p>
                </section>
                <section className={"mt-8"}>
                    <div className="flex items-center justify-between">
                        <h2>Cars</h2>
                        <Link href="http://localhost:3000/car/addcar">
                            <a className="btn-green text-center">add car</a>
                        </Link>
                    </div>
                    <ul className="mt-4">
                        {cars && cars.map(({id, name, created_at}) => (
                            <li key={id} className="mt-4">
                                <Link href={`/car/${id}`}>
                                    <a>{name}</a>
                                </Link>
                                <br/>
                                <small>
                                    created: <Date dateString={created_at}/>
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            </Layout>
        </div>

    )
}

export default Home

interface HomeProps {
    cars: Car[]
}