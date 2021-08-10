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

const Home = ({ allPostsData }:HomeProps) => {

  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section>
          <p>Hello, I&apos;m Rob.  I&apos;m a developer going through the get started tutorial for Next.js</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
          <section>
              <h2>Blog</h2>
              <ul>
                  {allPostsData.map(({id, date, title}) => (
                      <li key={id}>
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
          <section>
              <h2>User List</h2>
              <Link href={`/users/UserList`}>
                  <a>List of Users from Sever-side Rendering</a>
              </Link>
              <br/>
              <small>using external API call to <a target={"_blank"} rel="noreferrer" href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a></small>
          </section>
      </Layout>
  )
}

export default Home

interface HomeProps {
    allPostsData: {date: string, title: string, id: string}[]
}