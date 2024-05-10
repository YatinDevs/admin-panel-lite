import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd"; // Import Button and message from Ant Design
import dayjs from "dayjs"; // Import Day.js library

const Dashboard = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/enquiries");
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const enrichedEnquiries = await Promise.all(
          data.data.map(async (enquiry) => {
            const {
              by_user_id,
              to_user_id,
              for_load_id,
              for_space_id,
              ...rest
            } = enquiry;

            // Fetch user data for by_user and to_user
            const [byUserResponse, toUserResponse] = await Promise.all([
              fetch(`http://localhost:8081/api/v1/users/${by_user_id}`),
              fetch(`http://localhost:8081/api/v1/users/${to_user_id}`),
            ]);
            const [byUserData, toUserData] = await Promise.all([
              byUserResponse.json(),
              toUserResponse.json(),
            ]);

            // Fetch load and space data
            const [loadResponse, spaceResponse] = await Promise.all([
              fetch(`http://localhost:8081/api/v1/load/${for_load_id}`),
              fetch(`http://localhost:8081/api/v1/space/${for_space_id}`),
            ]);
            const [loadData, spaceData] = await Promise.all([
              loadResponse.json(),
              spaceResponse.json(),
            ]);

            return {
              ...rest,
              by_user: byUserData,
              to_user: toUserData,
              load: loadData,
              space: spaceData,
            };
          })
        );
        setEnquiries(enrichedEnquiries);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };
  // Function to handle button click event for a specific row
  const handleSendData = async (index) => {
    try {
      const enquiry = enquiries[index];
      const { by_user, to_user, load, space } = enquiry;

      // Make API calls to post data to the specified endpoints
      await Promise.all([
        fetch("http://localhost:4004/api/v1/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(by_user.data),
        }),
        fetch("http://localhost:4004/api/v1/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(to_user.data),
        }),
        fetch("http://localhost:4004/api/v1/loads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(load.data),
        }),
        fetch("http://localhost:4004/api/v1/spaces", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(space),
        }),
      ]);

      // Show success message
      message.success("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      // Show error message
      message.error("Error sending data. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Enquiry ID",
      dataIndex: "enquiry_id",
      key: "enquiry_id",
    },
    {
      title: "By User",
      dataIndex: "by_user",
      key: "by_user",
      render: (byUser) => <span>{byUser.data.name}</span>,
    },
    {
      title: "To User",
      dataIndex: "to_user",
      key: "to_user",
      render: (toUser) => <span>{toUser.data.name}</span>,
    },
    {
      title: "For Load ID",
      dataIndex: "load",
      key: "load",
      render: (loadData) => <span>{loadData?.data.load_id}</span>,
    },
    {
      title: "For Space ID",
      dataIndex: "space",
      key: "space",
      render: (spaceData) => <span>{spaceData?.space_id}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
      ), // Format createdAt using Day.js
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => (
        <span>{dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>
      ), // Format updatedAt using Day.js
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <Button type="primary" onClick={() => handleSendData(index)}>
          Confirm Status
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Matched Enquiries</h1>
      <Table dataSource={enquiries} columns={columns} />
    </div>
  );
};

export default Dashboard;
