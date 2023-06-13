import { useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";

const TASK_URL = "/tasks";

const UserTaskData = () => {
  const { auth, getUserTaskData, setGetUserTaskData } = useContent();
  const token = auth?.accessToken;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(TASK_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("UserTaskData ->>>", response.data);
        setGetUserTaskData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (taskId) => {
    // Handle edit functionality
    console.log("Edit Task ID:", taskId);
  };

  const handleDelete = (taskId) => {
    // Handle delete functionality
    console.log("Delete Task ID:", taskId);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="mb-4 text-2xl font-bold">User Task Data</h2>
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Task Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sub Task Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {getUserTaskData.map((task) => (
              <tr key={task._id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {formatDate(task.date)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{task._id}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{task.userId}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{task.userName}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{task.taskType}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {task.subTaskType}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    className="mr-2 text-indigo-600 hover:text-indigo-900 md:mr-3"
                    onClick={() => handleEdit(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTaskData;
