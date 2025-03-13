import React, { useState } from 'react';
import Loader from '../../components/shared/Loader';
import { useGetRecentPosts } from '../../react-query/queriesAndMutations';
import PostCard from '../../components/shared/PostCard';

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // Close the dropdown after selecting a filter
  };

  const filteredPosts = selectedFilter === 'All' ? posts?.documents : posts?.documents.filter(post => post.engineering === selectedFilter);
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>

          <div className='flex-between w-full max-w-5xl mb-7'>
            <h3 className='body-bold md:h3-bold'>Home Feed</h3>
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
          {isPostLoading && !posts ? (
            <Loader></Loader>
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {
                filteredPosts?.map((post) => (
                  <PostCard post={post} key={post.caption} />
                ))
              }
            </ul>
          )}

        </div>

      </div>
    </div>
  )
}

export default Home;