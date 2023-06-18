import Card from "../components/Card";

const Projects = () => {
  return (
    <>
      <div className="my-10 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center">
        <Card percentage1={80} percentage2={60} className="bg-[#ffe4cc]" />
        <Card percentage1={75} percentage2={40} className="bg-[#f0e4fc]" />
        <Card percentage1={65} percentage2={20} className="bg-[#d0f4dc]" />
        <Card percentage1={80} percentage2={60} className="bg-[#ffe4cc]" />
        <Card percentage1={75} percentage2={40} className="bg-[#f0e4fc]" />
        <Card percentage1={65} percentage2={20} className="bg-[#d0f4dc]" />
      </div>
    </>
  );
};

export default Projects;
