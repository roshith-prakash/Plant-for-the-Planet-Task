export default function Home() {
  return (
    <div className="min-h-screen flex flex-wrap lg:items-center bg-index3 bg-cover bg-no-repeat py-10 lg:py-0 gap-y-10 lg:gap-y-0">
      <div className="w-full lg:flex-1 flex justify-center items-center">
        <img
          // src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725986240/plant_d1wkt7.png"
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1726066114/plant_txhxwu.png"
          alt="Logo"
          className="animate__animated animate__fadeInUp h-[80%] w-[80%]"
        ></img>
      </div>

      <div className="w-full lg:flex-1 flex justify-center items-center">
        <div className="animate__animated animate__fadeInUp -translate-y-10 w-[90%] md:w-[80%] flex flex-col items-center gap-y-5 z-5 bg-white p-10 rounded-xl shadow-xl hover:scale-110 transition-all">
          <p className="text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-4xl py-1.5 pl-1 font-medium">
            Stop Talking, <span className="text-nowrap">Start Planting!</span>
          </p>

          <p className="mt-5 text-justify">
            Plant-for-the-Planet is a global movement empowering young people
            and organizations to restore forest ecosystems and fight for climate
            justice. To do so, we educate young people, restore ecosystems,
            conduct restoration research, provide free software tools and
            restoration advice for organizations around the world. We believe
            that we need to protect the world’s three trillion trees and bring
            back a further one trillion trees.
          </p>
        </div>
      </div>
    </div>
  );
}
