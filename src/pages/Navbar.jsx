import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
function Navbar() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storyType, setStoryType] = useState("jobstories");
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const storiesPerPage = 15;
  const fetchdata = async (storyType) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/${storyType}.json?print=pretty`,
      );
      setdata(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
    fetchdata(storyType);
  }, [storyType]);

  const indexOfLast = currentPage * storiesPerPage;
  const indexOfFirst = indexOfLast - storiesPerPage;
  const currentStories = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / storiesPerPage);

  const fetchnews = async (id) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );

      setSelectedStory(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const logout =async()=>{
    await signOut(auth);
    navigate("/");
  }
  const handlelogout=()=>{
    sessionStorage.removeItem("id");
    navigate("/");
  }
  return (
    <>
      <div className="md:flex md:min-h-screen overflow-auto">
        <div className={`bg-slate-800 text-white text-center text-xl fixed md:static top-16 left-0 
            h-[calc(100vh-4rem)] md:h-screen md:w-40 w-full transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <p className="p-2 font-bold m-2 hidden md:block">DASHBOARD</p>
          {["TopStories","NewStories","BestStories","AskStories","ShowStories","JobStories",].map((item)=> (
            <div key={item} onClick={() => {setStoryType(item.toLowerCase()); setIsSidebarOpen(false);}}
              className="cursor-pointer hover:bg-slate-700 p-3 whitespace-nowrap">
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="bg-slate-800 h-16 w-full flex md:justify-end justify-between items-center p-4 ">
            <div className="flex ">
            <span className="text-white text-xl font-semibold mr-4">
              Hacker News
            </span>
            <FaUser className="text-white text-2xl hover:cursor-pointer" onClick={()=>{logout();handlelogout();}}/>
            </div>
            {isSidebarOpen ? (
              <IoIosCloseCircle className="text-white text-2xl md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
            ) : (
              <FaBars className="text-white text-2xl md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
            )}
          </div>
          <div className="bg-slate-900 md:h-[calc(100vh-4rem)] h-full">
            <div className="flex bg-slate-900 text-white h-full">
                 <div className="bg-slate-900 md:h-[calc(100vh-4rem)] h-full">
                {loading ? (
                  <h2 className="text-white p-4 bg-slate-900 min-h-screen">Loading...</h2>
                ) : (
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Story List */}
                    <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-700">
                      <div className="text-lg font-bold mb-4">News List</div>
                      {currentStories.map((news, index) => (
                        <div key={index} className="mb-1">
                          <span>{index + 1}. </span>
                          News ID:{" "}
                          <button className="text-blue-500 ml-2" onClick={() => fetchnews(news)}>
                            {news}
                          </button>
                        </div>
                      ))}

                      {/* Pagination */}
                      <div className="mt-4 flex gap-4 items-center flex-wrap md:w-100">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="bg-gray-700 px-3 py-1"
                        >
                          Prev
                        </button>

                        <span>
                          Page {currentPage} of {totalPages}
                        </span>

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="bg-gray-700 px-3 py-1"
                        >
                          Next
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 p-6">
                      {selectedStory ? (
                        <div className="bg-gray-800 p-4 rounded">
                          <h2 className="text-lg md:text-xl font-bold mb-2">
                            {selectedStory.title}
                          </h2>
                          <p>Time: {new Date(selectedStory.time * 1000).toLocaleString()}</p>
                          <p>Type: {selectedStory.type}</p>

                          {selectedStory.url ? (
                            <a
                              href={selectedStory.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              Read Article
                            </a>
                          ) : (
                            <p>No external link available</p>
                          )}

                          <p className="mt-2">By: {selectedStory.by}</p>
                        </div>
                      ) : (
                        <p className="text-gray-400 min-h-screen">
                          Click a story to see details
                        </p>
                      )}
                    </div>
                  </div>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
