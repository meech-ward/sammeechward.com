import NextImage from "next/image"

import React, { useEffect, useState, Children } from "react"

import { MDXRemote } from "next-mdx-remote"

import "highlight.js/styles/stackoverflow-dark.css"

import YouTube from "../YouTube"
import InteractiveParallelism from "../ArticleComponents/InteractiveParallelism"
import SQLJoinsEditor from "../ArticleComponents/SQLJoinsEditor"
import TabsWithSections from "../TabsWithSections"
import ShareButtons from "../ShareButtons"

import Cards from "../Cards"
import Card from "../Card"

import GPTChat from "../ArticleComponents/ChatGPT/GPTChat"
import GPTChatSection from "../ArticleComponents/ChatGPT/GPTChatSection"

import Advertisement from "../ArticleComponents/Advertisement"

import { Note, Warning, Instruction, Error } from "../ArticleComponents/Blocks"

import normalizeImageSize from "../../helpers/normalizeImageSize"
import { twMerge } from "tailwind-merge"

import MailingListForm from "../../pages/mailing-list"

function addPropToChildren(children, propName, propValue) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, { [propName]: propValue })
  })
}

const urlEncodeFragment = (fragment) =>
  fragment
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase()

const h1 = (props) => <h1 {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? "" : " sm:text-5xl text-4xl sm:mt-14 mt-10 sm:mb-10 mb-8 font-semibold")} />
const h2 = (props) => {
  const fragment = urlEncodeFragment(props.children.toString())
  return (
    <a aria-label={props.children.toString()} href={`#${fragment}`}>
      <h2 id={fragment} {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? "" : " sm:text-4xl text-3xl sm:mt-12 mt-8 sm:mb-8 mb-6 font-semibold")} />
    </a>
  )
}
const h3 = (props) => <h3 {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? "" : " sm:text-3xl text-lg  sm:mt-10 mt-6 sm:mb-6 mb-4 font-semibold")} />
const p = (props) => <p {...{ ...props, gpt: undefined }} className={twMerge(props.className, props.gpt ? "" : " sm:text-lg text-base sm:my-8 my-4 font-light", props.inline ? "inline" : "")} />
const ul = (props) => <ul {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? " list-disc" : " sm:text-lg text-base sm:m-8  m-4 list-disc font-light")} />
const ol = (props) => <ol {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? " list-decimal" : " sm:text-lg text-base sm:m-8  m-4 list-decimal font-light")} />
const li = (props) => (
  <li {...{ ...props, gpt: undefined }} className={twMerge(props.className, "list-inside", !props.gpt && "sm:mb-4 mb-2")}>
    {addPropToChildren(props.children, "inline", "true")}
  </li>
)
const a = (props) => <a {...{ ...props, gpt: undefined }} className={props.className ?? "" + (props.gpt ? "" : " text-indigo-600 hover:text-indigo-500 font-light")} />
const pre = (props) => (
  <pre {...{ ...props, gpt: undefined }} className={twMerge(props.className ?? "w-full")}>
    {addPropToChildren(props.children, "codeBlock", "true")}
  </pre>
)
const code = (props) => <code {...{ ...props, gpt: undefined }} className={twMerge(props.className, props.codeBlock ? "" : " inline", props.gpt ? "gpt" : "")} />

const table = (props) => <table {...{ ...props, gpt: undefined }} className={twMerge(props.className, "border")} />
const th = (props) => <th {...{ ...props, gpt: undefined }} className={twMerge(props.className, "border px-4 py-3")} />
const td = (props) => <td {...{ ...props, gpt: undefined }} className={twMerge(props.className, "border px-4 py-3")} />


function urlForLocalFile({ path, dirUrl }) {
  if (path.startsWith("/images")) {
    return new URL(path.replace("/images/", "images/"), dirUrl + "/").href
  }
  if (path.startsWith("/files")) {
    return new URL(path.replace("/files/", "files/"), dirUrl + "/").href
  }
  if (path.startsWith("/assets")) {
    return new URL(path.replace("/assets/", "assets/"), dirUrl + "/").href
  }
  return url
}

export default function Page({ mdxSource, dirUrl, getPostBySlug, ImageComponent = NextImage, url, title, urlShort, ...props }) {
  function PostCard({ slug }) {
    const [post, setPost] = useState(null)
    useEffect(() => {
      getPostBySlug(slug).then(setPost)
    }, [slug])
    if (!post) return null
    // return <Cards posts={[post]} />
    const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
    return (
      <div className="mb-10 max-w-sm mx-auto">
        <Card ImageComponent={ImageComponent} post={post} imageSize={imageSize}></Card>
      </div>
    )
  }

  function Tabs({ children }) {
    const tabs = Children.map(children, (child) => ({ ...child.props }))
    tabs[0].current = true
    return <TabsWithSections tabs={tabs} />
  }

  function Tab({ children, name }) {
    return <div>Tab: name</div>
  }

  const img = ({ src, props }) => (src.startsWith("/images") || src.startsWith("/assets") ? <img src={urlForLocalFile({ path: props.src, dirUrl })} {...props} /> : <img src={src} {...props} />)
  const Image = ({ src, ...props }) => {
    return src.startsWith("/images") || src.startsWith("/assets") ? <NextImage {...props} src={urlForLocalFile({ path: src, dirUrl })} /> : <img {...props} src={src} />
  }
  const File = ({ path, children }) => (
    <a aria-label={`Download ${children.toString()}`} className="text-indigo-600 hover:text-indigo-500" href={urlForLocalFile({ path, dirUrl })}>
      {children}
    </a>
  )

  const AutoPlayVideo = ({ path, children }) => {
    // auto play video without sound or controls
    return (
      <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <video {...children} className="absolute top-0 left-0 w-full h-full" autoPlay muted loop playsInline>
          <source src={urlForLocalFile({ path, dirUrl })} type="video/mp4" />
        </video>
      </div>
    )
  }

  const Video = ({ path, children }) => {
    return (
      <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <video {...children} className="absolute top-0 left-0 w-full h-full" muted loop playsInline controls>
          <source src={urlForLocalFile({ path, dirUrl })} type="video/mp4" />
        </video>
      </div>
    )
  }

  const components = {
    h1,
    h2,
    h3,
    p,
    ul,
    ol,
    li,
    a,
    img,
    pre,
    code,
    table,
    th,
    td,
    Image,
    Note,
    Warning,
    Instruction,
    Error,
    Tabs,
    Tab,
    PostCard,
    YouTube,
    File,
    AutoPlayVideo,
    Video,
    InteractiveParallelism,
    SQLJoinsEditor,
    GPTChat,
    GPTChatSection,
    Advertisement
  }

  return (
    <div className="break-words">
      <ShareButtons className="float-right mb-2" url={url} title={title} urlShort={urlShort} />
      <MailingListForm />
      <main className="clear-both">{mdxSource && <MDXRemote {...mdxSource} components={components} />}</main>
    </div>
  )
}
