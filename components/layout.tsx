import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const name = `Rob`
export const siteTitle = 'Next.js Sample Website'

const Layout = ({children, home}: LayoutProps) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <div className={"w-full min-h-screen"}>
                <div
                    className={"mx-auto max-w-2xl p-12 md:pl-16 md:pr-16 lg:pl-20 lg:pr:20"}>
                    <header className={"border-b-2 border-gray-300"}>
                        {home ? (
                            <div className="text-center">
                                <Image
                                    priority
                                    src="/images/profile.jpg"
                                    className="rounded-full"
                                    height={144}
                                    width={144}
                                    alt={name}
                                />
                                <h1 className={"text-3xl font-extrabold mt-4 mb-8"}>{name}</h1>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Link href="/">
                                    <a>
                                        <Image
                                            priority
                                            src="/images/profile.jpg"
                                            className="rounded-full"
                                            height={144}
                                            width={144}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                                <h1 className={"mt-4 mb-8"}>
                                    <Link href="/">
                                        <a className={"text-black"}>{name}</a>
                                    </Link>
                                </h1>
                            </div>
                        )}
                    </header>
                    <main>{children}</main>
                    {!home && (
                        <div className={"text-center"}>
                            <Link href="/">
                                <a className={"btn-blue mt-8"}>← Back to home</a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Layout

interface LayoutProps {
    children: React.ReactNode,
    home?: boolean
}