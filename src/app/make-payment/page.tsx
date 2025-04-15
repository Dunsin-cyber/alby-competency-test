import Navbar from "@/components/Navbar";
import Payment from "@/components/Payments";

function Page() {
  return (
    <div className="min-h-screen flex flex-col px-[5%]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <Payment />
      </main>
    </div>
  );
}

export default Page;
