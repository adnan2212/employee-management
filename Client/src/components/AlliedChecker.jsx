import useContent from "../hooks/useContent";

const AlliedChecker = () => {
  const { allUsersData } = useContent();
  console.log(allUsersData);
  const currentDate = new Date().toLocaleDateString();
  console.log(currentDate);
  let totalHoursSpendInDay = 0;
  return (
    <>
      <div>AlliedChecker Component</div>
      {allUsersData.map((user) => (
        <div className="flex" key={user.id}>
          {/* <div>{user._id}</div> */}
          <div>{user.userId}</div>
          <div>{user.userName}</div>
        </div>
      ))}
    </>
  );
};

export default AlliedChecker;

{
  /*  {
   if(user.date.toLocaleDateString() === currentDate) {
       totalHoursSpendInDay += user.hoursSpend
   } else {
       totalHoursSpendInDay = 0
   }
} */
}
