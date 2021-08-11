import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const name = `Rob`
export const siteTitle = 'Next.js Sample Website'

const Layout = ({ children, home }: LayoutProps ) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
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
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className={"sm:max-w-sm pl-4 pr-4 md:max-w-lg mx-auto pt-8 pb-8"}>
            <header>



                {home ? (
                    <div className="text-center">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className="rounded-full shadow-sm"
                                height={144}
                                width={144}
                                alt={name}
                            />

                        <h1 className={"text-3xl font-extrabold"}>{name}</h1>
                    </div>
                ) : (
                    <div className="text-center">
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.jpg"
                                    className="rounded-full shadow-sm"
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h1>
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
        </>
    )
}

export default Layout

interface LayoutProps {
    children: React.ReactNode,
    home?: boolean
}