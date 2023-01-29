import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import langHttp from 'highlight.js/lib/languages/http'
import langNginx from 'highlight.js/lib/languages/nginx'
import langVim from 'highlight.js/lib/languages/vim'
import langGit from 'highlight.js/lib/languages/shell'
import langGraphQL from 'highlight.js/lib/languages/graphql'
import sql from 'highlight.js/lib/languages/sql'

import remarkGfm from 'remark-gfm'

const languages = {
  http: langHttp,
  nginx: langNginx,
  vim: langVim,
  git: langGit,
  mysql: sql,
  sql: sql,
  graphql: langGraphQL,
  prisma: langGraphQL,
  env: langGraphQL,
}

export default async function serializeMDX(source) {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [[remarkGfm]], // makes strikethrough work
      rehypePlugins: [[rehypeHighlight, {
        languages
      }
      ]],
      format: 'mdx',
      development: process.env.NODE_ENV !== 'production',
    },
  })
  return mdxSource
}

// Serialize but escape any jsx stuff, only treat it as markdown
export async function serializeMD(source) {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [[remarkGfm]], // makes strikethrough work
      rehypePlugins: [[rehypeHighlight, {
        languages
      }
      ]],
      format: 'md',
      development: process.env.NODE_ENV !== 'production',
    },
  })
  return mdxSource
}