import remarkHtml from "remark-html";
import remarkParse from 'remark-parse';
import Navbar from '../components/global/Navbar'
import fs from 'fs/promises'
import path from 'path'
import Head from "next/head";
import {unified} from "unified";

export default function Privacy(props: Props) {
  const {source} = props;

  return (
      <>
        <Head>
          <title>Privacy Policy</title>
          <meta property="og:title" content={"Privacy Policy"} />
        </Head>

        <Navbar />
        <div className={"mx-auto bg-gray-50 max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"}>
          <article
              className="prose max-w-full pt-16 font-medium text-neutral-600 prose-headings:text-black prose-a:text-sp-green prose-li:my-0.5"
              dangerouslySetInnerHTML={{ __html: source }}
          />
        </div>
      </>
  )
}

export async function getStaticProps() {
    const post = path.join(process.cwd(), 'public', 'privacy.md')
    const fileContents = await fs.readFile(post, 'utf8')

    const content = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(fileContents);

    return { props: { source: String(content) } }
}