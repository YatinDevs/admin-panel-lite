import React from "react";
import HeroForm from "../HeroForm/HeroForm";
import HeroImage from "../HeroImage/HeroImage";

const MainSection = () => {
  return (
    <div className="-mt-16">
      <div className="w-full min-h-[650px] md:min-h-[850px] md:h-screen bg-slate-100">
        <section
          className=" bg-no-repeat bg-cover bg-left md:bg-top h-[450px] md:h-full bg-blend-overlay xl:bg-blend-normal pt-16 md:18 lg:pt-20 xl:pt-22 2xl:pt-24"
          style={{
            background:
              "url(https://www.fr8.in/images/home-page-truck-image.png), linear-gradient(90deg, rgb(255, 255, 255) 0%,  rgba(24, 63, 156, 0.247) 0%)",
          }}
        >
          <div className="w-full  h-full mt-16  flex max-lg:flex-col justify-around items-center">
            <HeroImage />
            <HeroForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainSection;
