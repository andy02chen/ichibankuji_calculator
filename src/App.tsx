import Rates from "./components/Rates"

function App() {
  return (
    <div className="min-h-[100dvh] w-screen flex items-center justify-center 
    bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-gray-800
    pb-[env(safe-area-inset-bottom)]">
      <div className="overflow-auto max-h-[95dvh] sm:max-h-[80vh] w-11/12 sm:w-5/6 max-w-[95vw] sm:max-w-[75vw] select-none">
        <Rates />
      </div>
    </div>
  );
}

export default App