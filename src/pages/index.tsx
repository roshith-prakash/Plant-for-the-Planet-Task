import 'animate.css';

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-index3 bg-cover bg-no-repeat">
      <div className="animate__animated animate__fadeInUp -translate-y-10 flex flex-col items-center gap-y-5 z-5 bg-white p-10 rounded-xl shadow-xl hover:scale-110 transition-all">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1725986240/plant_d1wkt7.png"
          alt="Logo"
          className="h-48 w-48"
        ></img>
        <p className="text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-2xl pl-1 font-medium">
          Stop Talking, <span className="text-nowrap">Start Planting!</span>
        </p>
      </div>
    </div>
  );
}
