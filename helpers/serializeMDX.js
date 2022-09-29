import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import langHttp from 'highlight.js/lib/languages/http'
import langNginx from 'highlight.js/lib/languages/nginx'
import langVim from 'highlight.js/lib/languages/vim'
import langGit from 'highlight.js/lib/languages/shell'

const languages = {
  http: langHttp,
  nginx: langNginx,
  vim: langVim,
  git: langGit
}

export default async function serializeMDX(source) {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [[rehypeHighlight, {
        languages
      }
      ]],
      format: 'mdx'
    },
  })
  return mdxSource
}