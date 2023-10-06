import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import reqwest from "reqwest";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => `${name.first} ${name.last}`
  }
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params
});

const TestScroll = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await reqwest({
        url: "https://randomuser.me/api",
        method: "get",
        type: "json",
        data: getRandomuserParams(params)
      });
      const newData = response.results ?? [];
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!data.length) {
      fetch({ pagination })
        .then(newData => {
          setData(newData);
          setPagination({ ...pagination, total: 200 });
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [data, fetch, pagination]);
  

  useEffect(() => {
    const handleScroll = async () => {
      console.log("Hello")
      const isEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isEnd && data.length < 200) {
        try {
          setLoading(true);
          const newData = await fetch({
            pagination: { current: pagination.current + 1, pageSize: 10 }
          });
          setData((prevData) => [...prevData, ...newData]);
          setPagination((prevPagination) => ({ ...prevPagination, current: prevPagination.current + 1 }));
        } catch (error) {
          console.error("Error fetching more data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, fetch, pagination]);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
      scroll={{
        scrollToFirstRowOnChange: false,
        y: 300
      }}
    />
  );
};

export default TestScroll;
