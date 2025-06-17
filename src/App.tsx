import Rates from "./components/Rates"

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-gray-800 ">
      <div className="bg-white p-8 rounded-lg shadow-md overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Ichibankuji Rate Calculator
        </h1>
        <Rates/>
      </div>
    </div>
  )
}

export default App