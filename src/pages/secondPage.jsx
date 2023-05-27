import Logo from "../components/Logo";
import Header_2 from "../components/Header_2";
import Card from "../components/Card";
import Footer from "../components/Footer";

const SecondPage = () => {
  return (
    <>
      <Logo />
      <Header_2 title={"Projects"} />

      {/* 1 */}
      <div className="mt-10  flex min-w-min flex-col items-center md:flex-row md:flex-wrap md:justify-center">
        <Card percentage1={80} percentage2={60} className="bg-[#ffe4cc]" />
        <Card percentage1={75} percentage2={40} className="bg-[#f0e4fc]" />
        <Card percentage1={65} percentage2={20} className="bg-[#d0f4dc]" />
        <Card percentage1={80} percentage2={60} className="bg-[#ffe4cc]" />
        <Card percentage1={75} percentage2={40} className="bg-[#f0e4fc]" />
        <Card percentage1={65} percentage2={20} className="bg-[#d0f4dc]" />
      </div>

      <Footer />
    </>
  );
};

export default SecondPage;
