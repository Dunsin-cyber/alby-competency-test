import Navbar from "@/components/Navbar/AppNavbar";
import KeySend from "@/components/Payments/KeySend";

function Page() {
  return (
    <div className="min-h-screen flex flex-col px-[5%]">
      <Navbar />
      <main className="flex items-center justify-center">
        <KeySend />
      </main>
    </div>
  );
}

export default Page;
