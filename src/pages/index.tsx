export default function Home() {
  return (
    // Main div - flex on large screens
    <div className="min-h-screen flex flex-wrap lg:items-center bg-index3 bg-cover py-10 lg:py-0 gap-y-10 lg:gap-y-0">
      {/* Image div - stop talking start planting */}
      <div className="w-full lg:flex-1 flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1726066114/plant_txhxwu.png"
          alt="Logo"
          className="animate__animated animate__fadeInUp h-[80%] w-[80%]"
        ></img>
      </div>

      {/* Right div */}
      <div className="w-full lg:flex-1 flex justify-center items-center">
        {/* White box */}
        <div className="animate__animated animate__fadeInUp -translate-y-10 w-[90%] md:w-[80%] flex flex-col items-center gap-y-5 z-5 bg-white p-10 rounded-xl shadow-xl hover:scale-110 transition-all">
          {/* Gradient text title */}
          <p className="text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-4xl py-1.5 pl-1 font-medium">
            Stop Talking, <span className="text-nowrap">Start Planting!</span>
          </p>

          {/* Content */}
          <p className="mt-5 text-justify">
            Planting trees is one of the simplest yet most impactful actions we
            can take to combat climate change and restore our planet. As Plant
            for the Planet&apos;s motto says, &quot;Stop Talking, Start
            Planting&quot;—it’s a call to action for everyone to move beyond
            words and take real steps towards a greener future. Each tree you
            plant helps absorb carbon, provides habitat for wildlife, and
            improves the air we breathe. Let’s stop waiting for change and start
            creating it, one tree at a time!
          </p>
        </div>
      </div>
    </div>
  );
}
