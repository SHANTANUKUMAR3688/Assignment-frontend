import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6"
function Navbar() {
  const [data, setdata] = useState([]);
  const [newsid, setnewsid] = useState({});
  const [loading, setLoading] = useState(false);
  const [storyType, setStoryType] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 15;
  const handleClick = (e) => {
    const newStoryType = e.target.innerText.toLowerCase();
    setStoryType(newStoryType);
  };
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
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-slate-800 h-screen w-46 text-white text-center text-xl">
          <p className="p-2 font-bold m-2">DASHBOARD</p>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            TopStories
          </div>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            NewStories
          </div>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            BestStories
          </div>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            AskStories
          </div>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            ShowStories
          </div>
          <div
            className="cursor-pointer hover:bg-slate-700 p-2"
            onClick={handleClick}
          >
            JobStories
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-slate-800 h-16 w-full flex justify-end p-4 "><span className="text-white text-xl font-semibold mr-4">Hacker News</span><FaUser className="text-white text-2xl" /></div>
          <div className="bg-slate-900 h-[calc(100vh-4rem)]">
            <div className="flex bg-slate-900 text-white h-full">
              <div className="bg-slate-900 h-[calc(100vh-4rem)]">
                {loading ? (
                  <h2 className="text-white p-4">Loading...</h2>
                ) : (
                  <div className="flex h-full">
                    {/* LEFT SIDE - STORY LIST */}
                    <div className="w-1/2 p-4 border-r border-gray-700">
                      {currentStories.map((news, index) => (
                        <div key={index} className="mb-1">
                          Story ID:{" "}
                          <button
                            className="text-blue-500 cursor-pointer"
                            onClick={() => fetchnews(news)}
                          >
                            {news}
                          </button>
                        </div>
                      ))}

                      {/* Pagination */}
                      <div className="mt-4 flex gap-4 items-center">
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

                    {/* RIGHT SIDE - SELECTED STORY */}
                    <div className="w-1/2 p-6">
                      {selectedStory ? (
                        <div className="bg-gray-800 p-4 w-120 rounded">
                          <h2 className="text-xl font-bold mb-2">
                            {selectedStory.title}
                          </h2>

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
                        <p className="text-gray-400">
                          Click a story ID to see details
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
