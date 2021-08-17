import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import Date from "../components/date";
import {GetServerSideProps, GetStaticProps} from "next";
import React from "react";


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

    return (
        <div>
            <Layout home>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={"mt-8"}>
                    <p>Hello, I&apos;m Rob. I&apos;m practicing Next.js with Laravel.</p>
                </section>
                <section className={"mt-8"}>
                    <h2>Cars</h2>
                    <ul className="mt-4">
                        {cars.map(({id, name, created_at}) => (
                            <li key={id} className="mt-4">
                                <Link href={`/posts/${id}`}>
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