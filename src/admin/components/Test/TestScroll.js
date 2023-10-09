import React, { useState, useEffect } from "react";
import { navigate } from "react-router-dom"; // Adjust based on your routing mechanism
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllCategories, fetchAllDegrees } from '../../services/AdminService';

const style = {
  height: 100,
  border: "1px solid green",
  margin: 6,
  padding: 8,
  width:700
};
const TestScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (page, size) => {
    try {
      setIsLoading(true);  // Set loading to true when fetching
      const response = await fetchAllCategories(page, size, '', '', '');
      setItems([...items, ...response.data.data.businessCategories]);
      setTotalRows(response.data.data.totalRecords);
      setIsLoading(false);  // Reset loading when data is loaded
    } catch (error) {
      // Error handling logic
      setIsLoading(false);  // Reset loading in case of an error
    }
  };

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      fetchData(page + 1, 20);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData(page, 20);
  }, []);

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < totalRows}
        loader={isLoading && <h4>Loading...</h4>}  // Display loader when loading
      >
        {items.map((item, index) => (
          <div className="card" style={style} key={index}>
           <div>
           <img src="https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?pid=ImgDet&rs=1" width={50}></img>
           </div>
            Name - {item.title}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TestScroll;
