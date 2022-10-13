// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Fragment, useRef } from 'react'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'

// import { useDebounce, useDebounceCallback } from '@react-hook/debounce'
// import algoliasearch from 'algoliasearch/lite';
// import { InstantSearch, RefinementList, SearchBox } from 'react-instantsearch-hooks-web';

// const searchClient = algoliasearch('J0MMKXJ6HG', 'b40e330100fbe343e4cc59f6c09fcc25');


// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Header(props) {
//   const [value, setValue] = useDebounce('initialValue', 300)
//   const searchFn = useRef(null)
//   // const { links, user, signIn, signOut } = props

//   const onSearch = (e) => {
//     e.preventDefault()
//     props.onSearch(e.target.search.value)
//   }
//   useEffect(() => {
//     console.log("value", value)
//     searchFn.current(value)
//   }, [value])

//   const queryHook = (query, search) => {
//     // search(query);
//     console.log("query", query)
//     searchFn.current = search
//     setValue(query)
//   };




//   return (
//     <form className="w-full max-w-lg lg:max-w-xs" onSubmit={onSearch}>
//       <label htmlFor="search" className="sr-only">
//         Search
//       </label>
//       <div className="relative">
//         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//           <MagnifyingGlassIcon
//             className="h-5 w-5 text-gray-400"
//             aria-hidden="true"
//           />
//         </div>
//         {/* <input
//               id="search"
//               data-testid="search"
//               name="search"
//               className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
//               placeholder="Search"
//               type="search"
//             /> */}

//         <InstantSearch
//           searchClient={searchClient}
//           indexName="dev_sammeechward"
//         >
//           <SearchBox
//             // className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
//             placeholder="Search"
//             queryHook={queryHook}
//           />
//         </InstantSearch>

//       </div>
//     </form>

//   )
// }
