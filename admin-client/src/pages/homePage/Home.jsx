import React, { useEffect, useState } from "react";
import MainSection from "../../components/MainSection/MainSection";
import { getcustomersListings } from "../../../services/fetchCustomer";
import { createUsers } from "../../../services/createTables";

function Home() {
  const [usersData, setUsersData] = useState({});
  useEffect(() => {
    getcustomersListings().then((data) => {
      setUsersData(data.data);
    });
  }, []);
  console.log(usersData);

  const handleSendData = async () => {
    const byUserData = await createUsers({
      ...usersData,
    });

    if (byUserData) {
      console.log("Users add success");
    }
  };
  handleSendData();
  return (
    <div>
      <MainSection />
    </div>
  );
}

export default Home;
