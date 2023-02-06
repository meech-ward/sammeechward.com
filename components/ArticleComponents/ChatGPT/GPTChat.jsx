import Link from "next/link"
import Image from "next/image"

import { PlayIcon, DocumentTextIcon, QueueListIcon } from "@heroicons/react/24/outline"

import { twMerge } from "tailwind-merge"

export default function GPTChat({children}) {
  return (
    <div className="flex flex-col items-center text-sm h-full dark:bg-gray-800">
      {children}
    </div>
  )
}
