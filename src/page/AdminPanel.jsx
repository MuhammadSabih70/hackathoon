import React, { useEffect, useState } from 'react';
import Visitors from '../components/Visitor';
import UserDetailCard from '../components/UserDetailCard';
import axiosInstance from '../../axiosInstance';

function AdminPanel() {
  // State for search input and results
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [Visitor, setVisitor] = useState(null)
  const fetchVistors= async()=>{
    try {
      const response = await axiosInstance.get('/admin/getvisitors')
      console.log("data>>>>",response.data);
      setVisitor(response.data)
      console.log("response");
      
      
      
    } catch (error) {
      console.log("error>>>",error.message);
      
    }
  }
  useEffect(()=>{
      fetchVistors()
  },[])
  // Handle search function
  const handleSearch = async () => {
    try {
      // Make API request with the search input
      const response = await axiosInstance.get(`/admin/get-admin-data?cnic=${searchInput}`);
      setSearchResults(response.data.data);
      console.log("Response>>>>",searchResults);
       // Assuming 'data' contains user data
    } catch (error) {
      console.log('error>>>>', error);
      setSearchResults([]); // Clear results in case of an error
    }
  };

  return (<div className="w-full h-screen bg-gray-100 p-4">
    {/* Header */}
    <header className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </header>
  
    {/* Visitors Section */}
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Visitors</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Visitors visitor={Visitor} />
      </div>
    </section>
  
    {/* Search Section */}
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Search by CNIC</h2>
      <div className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center">
        {/* Search Input */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 h-12 border border-gray-300 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter CNIC"
        />
  
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 shadow-md"
        >
          Search
        </button>
      </div>
    </section>
  
    {/* User Detail Card Section */}
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Results</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {searchResults.length > 0 ? (
          <UserDetailCard data={searchResults} />
        ) : (
          <p className="text-gray-500">No results found. Try searching with a different CNIC.</p>
        )}
      </div>
    </section>
  </div>
  
  );
}

export default AdminPanel;