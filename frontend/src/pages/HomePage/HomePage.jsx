import React from "react";
import poster from "../../img/bgi.jpg";
const HomePage = () => {
  return (
    <>
      <section className="min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14"> 
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-2xl font-bold text-black">
                Create Posts to Educate
              </span>
              <h2 className="max-w-2xl mt-2  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
                Pen down your{" "}
              </h2>
              <h2 className="max-w-2xl mt-1 text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
                Ideas{" "}
              </h2>
              <h2 className="max-w-2xl mt-1  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
                By Creating{" "}
              </h2>
              <h2 className="max-w-2xl mt-1  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
                a Post{" "}
              </h2>
            </div>
            <div className="w-full lg:w-1/2 px-4 ">
              <img  src={poster} alt={poster} />
            </div>
          </div>
          <div className="bg-slate-100 bg-center">
          <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-slate-700 text-center font-semibold">
                Your Posts must be free from Racism and Unhealthy words
          </p>
          </div>
          
          
        </div>
      </section>
    </>
  );
};

export default HomePage;