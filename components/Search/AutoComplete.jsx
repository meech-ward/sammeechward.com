// import {
//   createElement,
//   Fragment,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';

// const INSTANT_SEARCH_INDEX_NAME = 'insdev_sammeechward';
// const INSTANT_SEARCH_QUERY_SUGGESTIONS =
//   'dev_sammeechward_query_suggestions';
// // const INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES = [
// //   'hierarchicalCategories.lvl0',
// //   'hierarchicalCategories.lvl1',
// // ]

// import {
//   useHierarchicalMenu,
//   usePagination,
//   useSearchBox,
// } from 'react-instantsearch-hooks';
// import { autocomplete } from '@algolia/autocomplete-js';
// import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
// import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
// import { debounce } from '@algolia/autocomplete-shared';

// import '@algolia/autocomplete-theme-classic';


// export function Autocomplete({
//   searchClient,
//   className,
//   ...autocompleteProps
// }) {
//   const autocompleteContainer = useRef(null);

//   const { query, refine: setQuery } = useSearchBox();
//   const { items: categories, refine: setCategory } = useHierarchicalMenu({
//     attributes: INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES,
//   });
//   const { refine: setPage } = usePagination();

//   const [
//     instantSearchUiState,
//     setInstantSearchUiState,
//   ] = useState({ query });
//   const debouncedSetInstantSearchUiState = debounce(
//     setInstantSearchUiState,
//     500
//   );

//   useEffect(() => {
//     setQuery(instantSearchUiState.query);
//     instantSearchUiState.category && setCategory(instantSearchUiState.category);
//     setPage(0);
//   }, [instantSearchUiState]);

//   const currentCategory = useMemo(
//     () => categories.find(({ isRefined }) => isRefined)?.value,
//     [categories]
//   );

//   const plugins = useMemo(() => {
//     const recentSearches = createLocalStorageRecentSearchesPlugin({
//       key: 'instantsearch',
//       limit: 3,
//       transformSource({ source }) {
//         return {
//           ...source,
//           onSelect({ item }) {
//             setInstantSearchUiState({
//               query: item.label,
//               category: item.category,
//             });
//           },
//         };
//       },
//     });

//     const querySuggestionsInCategory = createQuerySuggestionsPlugin({
//       searchClient,
//       indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
//       getSearchParams() {
//         return recentSearches.data?.getAlgoliaSearchParams({
//           hitsPerPage: 3,
//           facetFilters: [
//             `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:${currentCategory}`,
//           ],
//         });
//       },
//       transformSource({ source }) {
//         return {
//           ...source,
//           sourceId: 'querySuggestionsInCategoryPlugin',
//           onSelect({ item }) {
//             setInstantSearchUiState({
//               query: item.query,
//               category: item.__autocomplete_qsCategory,
//             });
//           },
//           getItems(params) {
//             if (!currentCategory) {
//               return [];
//             }

//             return source.getItems(params);
//           },
//           templates: {
//             ...source.templates,
//             header({ items }) {
//               if (items.length === 0) {
//                 return <Fragment />;
//               }

//               return (
//                 <Fragment>
//                   <span className="aa-SourceHeaderTitle">
//                     In {currentCategory}
//                   </span>
//                   <span className="aa-SourceHeaderLine" />
//                 </Fragment>
//               );
//             },
//           },
//         };
//       },
//     });

//     const querySuggestions = createQuerySuggestionsPlugin({
//       searchClient,
//       indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
//       getSearchParams() {
//         if (!currentCategory) {
//           return recentSearches.data.getAlgoliaSearchParams({
//             hitsPerPage: 6,
//           });
//         }

//         return recentSearches.data.getAlgoliaSearchParams({
//           hitsPerPage: 3,
//           facetFilters: [
//             `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:-${currentCategory}`,
//           ],
//         });
//       },
//       categoryAttribute: [
//         INSTANT_SEARCH_INDEX_NAME,
//         'facets',
//         'exact_matches',
//         INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0],
//       ],
//       transformSource({ source }) {
//         return {
//           ...source,
//           sourceId: 'querySuggestionsPlugin',
//           onSelect({ item }) {
//             setInstantSearchUiState({
//               query: item.query,
//               category: item.__autocomplete_qsCategory || '',
//             });
//           },
//           getItems(params) {
//             if (!params.state.query) {
//               return [];
//             }

//             return source.getItems(params);
//           },
//           templates: {
//             ...source.templates,
//             header({ items }) {
//               if (!currentCategory || items.length === 0) {
//                 return <Fragment />;
//               }

//               return (
//                 <Fragment>
//                   <span className="aa-SourceHeaderTitle">
//                     In other categories
//                   </span>
//                   <span className="aa-SourceHeaderLine" />
//                 </Fragment>
//               );
//             },
//           },
//         };
//       },
//     });

//     return [recentSearches, querySuggestionsInCategory, querySuggestions];
//   }, [currentCategory]);

//   useEffect(() => {
//     if (!autocompleteContainer.current) {
//       return;
//     }

//     const autocompleteInstance = autocomplete({
//       ...autocompleteProps,
//       container: autocompleteContainer.current,
//       initialState: { query },
//       plugins,
//       onReset() {
//         setInstantSearchUiState({ query: '', category: currentCategory });
//       },
//       onSubmit({ state }) {
//         setInstantSearchUiState({ query: state.query });
//       },
//       onStateChange({ prevState, state }) {
//         if (prevState.query !== state.query) {
//           debouncedSetInstantSearchUiState({
//             query: state.query,
//           });
//         }
//       },
//       renderer: { createElement, Fragment, render: () => {} },
//     });

//     return () => autocompleteInstance.destroy();
//   }, [plugins]);

//   return <div className={className} ref={autocompleteContainer} />;
// }
