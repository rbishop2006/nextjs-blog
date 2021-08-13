import Head from 'next/head'
import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from "../../components/date";
import {GetStaticProps, GetStaticPaths} from "next";
import styles from "./posts.module.css"

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params?.id as string)
    return {
        props: {
            postData
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}


const Post = ({postData}: PostDataProps
) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article className={"mt-8"}>
                <h2>{postData.title}</h2>
                <div className={"mt-2"}>
                    <Date dateString={postData.date}/>
                </div>
                <div className={styles.innerHTML} dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    )

}

export default Post

interface PostDataProps {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}
