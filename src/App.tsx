import Rates from "./components/Rates"

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center 
    bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-gray-800 ">
      <div className="rounded-2xl overflow-auto max-h-[80vh] w-5/6 max-w-[75w] select-none m">
        <Rates/>
      </div>
    </div>
  )
}

export default App