import Rates from "./components/Rates"

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-gray-800 ">
      <div className="bg-white rounded-2xl shadow-md overflow-auto max-h-[80vh] w-5/6 max-w-[75w] select-none">
        <Rates/>
      </div>
    </div>
  )
}

export default App