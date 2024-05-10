// Required modules
const { Load, Space, Enquiry, User } = require("../models/server1");
const { LoadS2, SpaceS2, EnquiryS2, UserS2 } = require("../models/server2");
async function populateData() {
  try {
    // Fetch data from Digital Ocean database
    const digitalOceanUsers = await User.findAll();
    const digitalOceanLoads = await Load.findAll();
    const digitalOceanSpaces = await Space.findAll();
    const digitalOceanEnquiries = await Enquiry.findAll();

    await Promise.all([
      Promise.all(
        digitalOceanUsers.map(async (user) => {
          await UserS2.upsert(user.toJSON());
        })
      ),
      Promise.all(
        digitalOceanLoads.map(async (load) => {
          await LoadS2.upsert(load.toJSON());
        })
      ),
      Promise.all(
        digitalOceanSpaces.map(async (space) => {
          await SpaceS2.upsert(space.toJSON());
        })
      ),
      Promise.all(
        digitalOceanEnquiries.map(async (enquiry) => {
          await EnquiryS2.upsert(enquiry.toJSON());
        })
      ),
    ]);

    console.log("Data populated successfully!");
  } catch (error) {
    console.error("Error populating data:", error);
  }
}

populateData();
