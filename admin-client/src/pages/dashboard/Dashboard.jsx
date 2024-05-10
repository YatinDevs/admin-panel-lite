import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import dayjs from "dayjs";
import {
  createCustomer,
  createLoad,
  createSpace,
  createMatch,
} from "../../../services/createTables"; // Import API functions to create resources
import { fetchEnquiries } from "../../../services/fetchEnquiries";
import MatchesDashboard from "./MatchesDashBoard";
import { fetchMatches } from "../../../services/fetchTables";
import "./styles.css";
import ContentWrapper from "../../components/ContentWrapper copy/ContentWrapper";

const Dashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null); // State to manage selected enquiry for dropdown
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Number of items per page
  });
  console.log(enquiries);

  useEffect(() => {
    fetchEnquiries().then((data) => {
      console.log(data);
      setEnquiries(data);
    });

    fetchMatches()
      .then((data) => {
        console.log(data);
        setMatches(data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
        // Show error message
        message.error("Error fetching matches. Please try again later.");
      });
  }, []);

  const handleSendData = async (index) => {
    try {
      const enquiry = enquiries[index];
      const { by_user, to_user, load, space, enquiry_id } = enquiry;

      // Create customer data for by_user and to_user
      const byCustomerData = await createCustomer({
        ...by_user,
        enquiry_id,
        customer_type: "enquirer",
      });

      const toCustomerData = await createCustomer({
        ...to_user,
        enquiry_id,
        customer_type: "enquiree",
      });

      // Create load and space data
      const loadResponse = await createLoad();
      const spaceResponse = await createSpace(space);
      console.log(byCustomerData);
      console.log(toCustomerData);
      console.log(loadResponse);
      console.log(spaceResponse);
      // Get the employee details from local storage
      const employeeDetails = JSON.parse(
        localStorage.getItem("employeeDetails")
      );

      // Extract emp_id from the employeeDetails object
      const assignedTo = employeeDetails.emp_id;

      const matchData = {
        enquiry_id,
        by_customer_id: byCustomerData.customer_id,
        to_customer_id: toCustomerData.customer_id,
        for_ops_load_id: loadResponse.data.ops_load_id,
        for_ops_space_id: spaceResponse.data.ops_space_id,
        is_hard_match: true, // Example value for is_hard_match
        assigned_to: assignedTo, // Assign the extracted emp_id to assigned_to field
        confirmation_status: "pending", // Example value for confirmation_status
        confirmation_time: new Date().toISOString(), // Example value for confirmation_time
        // Include other attributes as needed
      };

      // Create match
      await createMatch(matchData);
      // Update the matches state by refetching matches
      const updatedMatches = await fetchMatches();
      setMatches(updatedMatches);

      // Fetch contact number of the to_user
      const toUserContact = to_user.contact;

      // Send WhatsApp message
      const whatsappURL = `https://api.whatsapp.com/send/?phone=8600709917&text=You+have+an+enquiry+for+your+space+by+load&app_absent=0`;
      // Open WhatsApp message URL in a new tab or another opened window
      const whatsappWindow = window.open(whatsappURL, "_blank");

      // Check if window was blocked by the browser
      if (
        !whatsappWindow ||
        whatsappWindow.closed ||
        typeof whatsappWindow.closed === "undefined"
      ) {
        throw new Error(
          "Failed to open WhatsApp. Please ensure pop-ups are allowed for this site."
        );
      }

      message.success("Data sent and match created successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
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
      render: (byUser) => (
        <span className="text-xs md:text-md text-center uppercase">
          {byUser.name}
        </span>
      ),
    },
    {
      title: "To User",
      dataIndex: "to_user",
      key: "to_user",
      render: (toUser) => (
        <span className="text-xs md:text-md text-center uppercase">
          {toUser.name}
        </span>
      ),
    },
    {
      title: "Load ID",
      dataIndex: "load",
      key: "load",
      render: (loadData) => (
        <span className="text-xs md:text-md text-center uppercase">
          {loadData.load_id}
        </span>
      ),
    },
    {
      title: "Space ID",
      dataIndex: "space",
      key: "space",
      render: (spaceData) => (
        <span className="text-xs md:text-md text-center uppercase">
          {spaceData.space_id}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span className="text-xs md:text-md text-center uppercase">
          {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ), // Format createdAt using Day.js
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => (
        <span className="text-xs md:text-md text-center uppercase">
          {dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ), // Format updatedAt using Day.js
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <div className=" text-xs text-center uppercase flex flex-col justify-center items-center gap-2">
          <div className="w-full">
            <Button
              type="primary"
              className="custom-button2 w-full text-xs"
              onClick={() => handleRowClick(record)}
            >
              Details
            </Button>{" "}
          </div>
          <div className="w-full">
            <Button
              type="primary"
              className="custom-button focus:bg-green-500 hover:bg-green-600 bg-green-400 w-full text-xs"
              onClick={() => handleSendData(index)}
            >
              Message
            </Button>{" "}
          </div>
        </div>
      ),
    },
  ];

  const handleRowClick = (enquiry) => {
    // Toggle the selectedEnquiry state
    if (selectedEnquiry === enquiry) {
      setSelectedEnquiry(null); // If already selected, deselect
    } else {
      setSelectedEnquiry(enquiry); // Select the clicked row
    }
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination); // Update pagination state
  };

  return (
    <ContentWrapper>
      <div className="mx-5 mt-28 md:mt-20">
        <div className=" w-full shadow-lg border mb-5 bg-[#f4f4f4] md:p-2 rounded-lg">
          <h1 className=" text-md md:text-lg font-bold m-2">
            Matched Enquiries
          </h1>{" "}
          <Table
            className="custom-table text-xs md:text-md"
            dataSource={enquiries}
            columns={columns}
            rowKey="enquiry_id"
            pagination={pagination}
            onChange={handleTableChange}
          />{" "}
          <div>
            {<RenderAdditionalDetails selectedEnquiry={selectedEnquiry} />}
          </div>
        </div>
        <MatchesDashboard matches={matches} setMatches={setMatches} />
      </div>
    </ContentWrapper>
  );
};

export default Dashboard;

const RenderAdditionalDetails = ({ selectedEnquiry }) => {
  console.log(selectedEnquiry);
  if (!selectedEnquiry) return <></>; // If no enquiry is selected, don't render dropdown

  // Render additional details in dropdown
  return (
    <div className="additional-details">
      {/* Render additional details here based on selectedEnquiry */}
      <MainComponent selectedEnquiry={selectedEnquiry} />
    </div>
  );
};

const LoadCard = ({ load }) => {
  return (
    <ContentWrapper>
      <div className="card bg-white text-xs md:text-md rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col">
          <div className="w-full p-2 rounded-xl  h-[150px]">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={load.image_urls[0]}
              alt="Load Image"
            />
          </div>
          <div className="flex-1 p-2">
            <h2 className="text-xs md:text-md font-bold mb-4">Load Details</h2>
            <p>
              <span className="font-semibold">Load ID:</span> {load.load_id}
            </p>
            <p>
              <span className="font-semibold">From:</span> {load.from_city},{" "}
              {load.from_pin}
            </p>
            <p>
              <span className="font-semibold">To:</span> {load.to_city},{" "}
              {load.to_pin}
            </p>
            <p>
              <span className="font-semibold">Dimensions:</span> {load.length}x
              {load.width}x{load.height}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {load.weight} tons
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

const SpaceCard = ({ space }) => {
  return (
    <div className="card bg-white text-xs md:text-md rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col">
        <div className="w-full p-2 rounded-xl  h-[150px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src={space.image_urls[0]}
            alt="Space Image"
          />
        </div>
        <div className="flex-1 p-2">
          <h2 className="text-xs md:text-md font-bold mb-4">Space Details</h2>
          <p>
            <span className="font-semibold">Space ID:</span> {space.space_id}
          </p>
          <p>
            <span className="font-semibold">From:</span> {space.from_city},{" "}
            {space.from_pin}
          </p>
          <p>
            <span className="font-semibold">To:</span> {space.to_city},{" "}
            {space.to_pin}
          </p>
          <p>
            <span className="font-semibold">Stops:</span> {space.stop_1},{" "}
            {space.stop_2}, {space.stop_3}, {space.stop_4}, {space.stop_5},{" "}
            {space.stop_6}
          </p>
          <p>
            <span className="font-semibold">Dimensions:</span> {space.length}x
            {space.width}x{space.height}
          </p>
          <p>
            <span className="font-semibold">Weight:</span> {space.weight} tons
          </p>
        </div>
      </div>
    </div>
  );
};

const ByUserCard = ({ byUser }) => {
  return (
    <div className="card bg-white rounded-lg shadow-md p-2">
      <h2 className="text-xs md:text-md font-bold mb-2">By User</h2>
      <p>
        <span className="font-semibold">Name:</span> {byUser.name}
      </p>
      <p>
        <span className="font-semibold">Contact:</span> {byUser.contact}
      </p>
    </div>
  );
};

const ToUserCard = ({ toUser }) => {
  return (
    <div className="card bg-white rounded-lg shadow-md p-2">
      <h2 className="text-xs md:text-md font-bold mb-2">To User</h2>
      <p>
        <span className="font-semibold">Name:</span> {toUser.name}
      </p>
      <p>
        <span className="font-semibold">Contact:</span> {toUser.contact}
      </p>
    </div>
  );
};

const MainComponent = ({ selectedEnquiry }) => {
  return (
    <div className="grid grid-cols-2 text-xs md:text-md gap-2">
      <LoadCard load={selectedEnquiry.load} />
      <SpaceCard space={selectedEnquiry.space} />
      <ByUserCard byUser={selectedEnquiry.by_user} />
      <ToUserCard toUser={selectedEnquiry.to_user} />
    </div>
  );
};
