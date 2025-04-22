import Navbar from "@/components/Navbar";
import Receive from "@/components/Receive";

function Page() {
  return (
    <div className="min-h-screen flex flex-col px-[5%]">
      <Navbar />
      <main className="flex items-center justify-center">
        <Receive />
      </main>
    </div>
  );
}

export default Page;
