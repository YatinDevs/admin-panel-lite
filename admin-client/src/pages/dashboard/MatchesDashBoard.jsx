import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd"; // Import Button and message from Ant Design
import dayjs from "dayjs"; // Import Day.js library
import { fetchMatches } from "../../../services/fetchTables";
import "./styles.css";

const MatchesDashboard = ({ matches, setMatches }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Number of items per page
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination); // Update pagination state
  };
  const columns = [
    {
      title: "Match ID",
      dataIndex: "match_id",
      key: "match_id",
    },
    {
      title: "Enquiry ID",
      dataIndex: "enquiry_id",
      key: "enquiry_id",
    },
    {
      title: "By Customer ID",
      dataIndex: "by_customer_id",
      key: "by_customer_id",
    },
    {
      title: "To Customer ID",
      dataIndex: "to_customer_id",
      key: "to_customer_id",
    },
    {
      title: "For Ops Load ID",
      dataIndex: "for_ops_load_id",
      key: "for_ops_load_id",
    },
    {
      title: "For Ops Space ID",
      dataIndex: "for_ops_space_id",
      key: "for_ops_space_id",
    },
    {
      title: "Is Hard Match",
      dataIndex: "is_hard_match",
      key: "is_hard_match",
      render: (isHardMatch) => <span>{isHardMatch ? "Yes" : "No"}</span>,
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
    },
    {
      title: "Confirmation Status",
      dataIndex: "confirmation_status",
      key: "confirmation_status",
    },
    {
      title: "Confirmation Time",
      dataIndex: "confirmation_time",
      key: "confirmation_time",
      render: (confirmationTime) => (
        <span>{dayjs(confirmationTime).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
  ];

  return (
    <div className="container mx-auto bg-[#f4f4f4] p-2 shadow-lg border rounded-lg">
      <h1 className="text-lg font-bold mb-2">Confirmed Matches </h1>
      {matches.length > 0 ? (
        <Table
          className="custom-table"
          dataSource={matches}
          columns={columns}
          rowKey="match_id"
          pagination={pagination}
          onChange={handleTableChange}
        />
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchesDashboard;
