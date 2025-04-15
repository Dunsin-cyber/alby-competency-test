function index() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* balance */}
      <h1 className="text-2xl font-bold">Wallet</h1>
      <div className="flex space-x-3  items-center justify-center p-4 rounded-md ">
        <p className="text-4xl font-bold">30.00</p>
        <p className="text-lg">sats</p>
      </div>
      {/* action buttons */}
      <div className="flex space-x-4">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Send Sats
          </span>
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-6 py-3 rounded-full tracking-widest font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Recieve
        </button>
      </div>

      {/* transactions */}
      <div className="mt-6">

      <h1 className="text-2xl font-bold">Transactions</h1>
      <div className="bg-gray-200 p-4 rounded-md"></div>
      </div>
    </div>
  );
}

export default index;
