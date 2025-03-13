import { React, useState, useEffect } from 'react';
import GridPostList from '../../components/shared/GridPostList';
import SearchResults from '../../components/shared/SearchResults';
import { useGetPosts, useSearchPosts } from '../../react-query/queriesAndMutations';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../../components/shared/Loader';
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // Close the dropdown after selecting a filter
  };

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0);
  const filteredPosts = selectedFilter === 'All' ? posts.pages.flatMap(page => page.documents) : posts.pages.flatMap(page => page.documents).filter(post => post.engineering === selectedFilter);

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-postBackground focus-within:outline focus-within:outline-2 focus-within:outline-customGreen-3'>
          <img
            src="/Assets/icons/search.svg"
            alt="search"
            width={24}
            height={24} />
          <input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='relative'>
          <div className='flex-center gap-3 bg-postDetailBacground rounded-xl px-4 py-2 cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <p className='small-medium md:base-medium text-light-2'>{selectedFilter}</p>
            <img
              src="/Assets/icons/filter.svg"
              alt="filter"
              height={24}
              width={24} />
          </div>
          {isDropdownOpen && (
            <div className='flex-col top-full mt-2 bg-customGreen-2 shadow-lg rounded-xl z-10 max-h-48 overflow-y-auto'>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('All')}>
                <p className='small-medium md:base-medium text-light-2'>All</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Computer Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Computer</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Software Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Software</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Civil Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Civil</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Mechanical Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Mechanical</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Electrical Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Electrical</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Chemical Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Chemical</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Biomedical Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Biomedical</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Aeronautical Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Aeronautical</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Space Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Space</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Environmental Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Environmental</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Geological Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Geological</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Materials Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Materials</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Mining Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Mining</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Nuclear Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Nuclear</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Petroleum Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Petroleum</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Transportation Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Transportation</p>
              </div>
              <div className='flex-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:rounded-xl' onClick={() => handleFilterChange('Water Resources Engineering')}>
                <p className='small-medium md:base-medium text-light-2'>Water Resources</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl '>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-customGreen-3 mt-10 text-center w-full">End of posts</p>
        ) : (
          <GridPostList posts={filteredPosts} />
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;