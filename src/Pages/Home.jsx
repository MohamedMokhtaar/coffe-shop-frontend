import React from 'react';
import image1 from "../assets/co1.jpeg";
import image2 from "../assets/co5.jpeg";
import image3 from "../assets/co6.jpeg";

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-[#5C4033] p-6 text-white shadow-xl shadow-[#5C4033]/20 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Dashboard</p>
        <h1 className="mt-2 text-3xl font-extrabold">Welcome to Maandeeq Coffee</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
          Manage items, orders, staff, roles, and users from one clean workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <img src={image1} alt="Coffee 1" className="h-[360px] w-full rounded-2xl object-cover shadow-xl shadow-[#5C4033]/10" />
        <img src={image2} alt="Coffee 2" className="h-[360px] w-full rounded-2xl object-cover shadow-xl shadow-[#5C4033]/10" />
        <img src={image3} alt="Coffee 3" className="h-[360px] w-full rounded-2xl object-cover shadow-xl shadow-[#5C4033]/10" />
      </div>
    </div>
  );
};

export default Home;
