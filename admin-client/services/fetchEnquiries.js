export const fetchEnquiries = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/v1/enquiries");
    const data = await response.json();
    console.log(data, `allenquiries`);
    if (data) {
      const enrichedEnquiries = await Promise.all(
        data.data.map(async (enquiry) => {
          const { by_user_id, to_user_id, for_load_id, for_space_id, ...rest } =
            enquiry;

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
            by_user: byUserData.data,
            to_user: toUserData.data,
            load: loadData.data,
            space: spaceData,
          };
        })
      );
      return enrichedEnquiries;
    }
  } catch (error) {
    console.error("Error fetching enquiries:", error);
  }
};
