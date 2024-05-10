import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";

const HeroForm = () => {
  const [value, setValue] = useState("Login");

  return (
    <div className="formSection mb-20  lg:-translate-y-20 shadow-lg rounded-lg lg:basis-1/2 ">
      <div className="formContainer h-[550px] md:h-[600px] max-w-md max-sm:max-w-sm max-sm:w-[22rem] w-[32rem] bg-white rounded-lg border-l-4 border-r-4 border-blue-500 border ">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <TabList
              onChange={(e, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab
                sx={{ width: "50%" }}
                label={<h1 className="font-semibold">LOGIN</h1>}
                value={"Login"}
              />
              <Tab
                sx={{ width: "50%" }}
                label={<h1 className="font-semibold">SIGNUP</h1>}
                value={"Signup"}
              />
            </TabList>
          </Box>

          <TabPanel value="Login">
            {" "}
            <LoginTab />{" "}
          </TabPanel>
          <TabPanel value="Signup">
            {" "}
            <SignupTab />{" "}
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default HeroForm;
