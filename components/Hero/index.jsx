/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Image from 'next/future/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero({ title, subTitle, description, imageUrl, imageWidth, imageHeight, buttons }) {
  const imageDimensions = {}
  if (imageWidth && imageHeight) {
    imageDimensions.width = imageWidth
    imageDimensions.height = imageHeight
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative z-10 bg-white pb-4 sm:pb-8 md:pb-10 lg:w-2/4 lg:max-w-2xl lg:pb-14 xl:pb-16">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative px-4 pt-1 sm:px-6 lg:px-8">
          </div>


          <main className="mx-auto mt-10 max-w-7xl px-2 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{title}</span>
                <br />
                <span className="block text-indigo-600 xl:inline">{subTitle}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                {description.split('\n').map(a => a.trim()).filter(a => a).map(line => (
                  <p>{line}</p>
                ))}
              </p>
              {buttons && (
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {buttons[0] && (
                    <div className="rounded-md shadow">
                      <a
                        href={buttons[0].href}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                      >
                        {buttons[0].title}
                      </a>
                    </div>
                  )}
                  {buttons[1] && (
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href={buttons[1].href}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                      >
                        {buttons[1].title}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src={imageUrl}
          {...imageDimensions}
          // height={500}
          // width={500}
          alt=""
        />
      </div>
    </div>
  )
}
