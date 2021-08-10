import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Date from "../components/date";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

const styles = {
    wrapper: "@apply max-w-md mx-auto pt-8"
}

const Home = ({ allPostsData }:HomeProps) => {

  return (
      <div>
          <Layout home>
              <Head>
                  <title>{siteTitle}</title>
              </Head>
              <section className={"mt-8"}>
                  <p>Hello, I&apos;m Rob.  I&apos;m a developer going through the get started tutorial for Next.js</p>
                  <p className={"mt-4"}>
                      (This is a sample website - you’ll be building a site like this on{' '}
                      <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                  </p>
              </section>
              <section className={"mt-8"}>
                  <h2>Blog</h2>
                  <ul className={"mt-4"}>
                      {allPostsData.map(({id, date, title}) => (
                          <li key={id} className={"mt-4"}>
                              <Link href={`/posts/${id}`}>
                                  <a>{title}</a>
                              </Link>
                              <br />
                              <small>
                                  <Date dateString={date} />
                              </small>
                          </li>
                      ))}
                  </ul>
              </section>
              <section className={"mt-8"}>
                  <h2>User List</h2>
                  <div className={"mt-4"}>
                      <Link href={`/users/UserList`}>
                          <a>List of Users from Sever-side Rendering</a>
                      </Link>
                  <br/>
                      <small>using external API call to <a target={"_blank"} rel="noreferrer" href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a></small>
                  </div>
              </section>
          </Layout>

      </div>

  )
}

export default Home

interface HomeProps {
    allPostsData: {date: string, title: string, id: string}[]
}