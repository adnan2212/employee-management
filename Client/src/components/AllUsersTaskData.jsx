import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import axios from "../api/axios";

const ALL_USERS_DATA = "/tasks/details";
const AllUsersTaskData = () => {
  const [data, setData] = useState([]);
  const { setAllUsersData, auth } = useContent();
  const token = auth?.accessToken;

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await axios.get(ALL_USERS_DATA, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("ADMINallUserData ->>>", response.data);
        setData(response.data);
        setAllUsersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsersData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Hours Spent</th>
          <th>Subtask Type</th>
          <th>Task Type</th>
          <th>User ID</th>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.hoursSpent}</td>
            <td>{item.subTaskType}</td>
            <td>{item.taskType}</td>
            <td>{item.userId}</td>
            <td>{item.userName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllUsersTaskData;
