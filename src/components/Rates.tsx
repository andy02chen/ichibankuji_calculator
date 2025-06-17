import { useState } from "react";

export default function Rates() {

  const [rate, setRate] = useState(20);
  const [totalPrizes, setTotalPrizes] = useState(0);
  const [prizeTiers, setPrizeTiers] = useState({
    A: { id: 1, prizes: 1, want: true },
    B: { id: 2, prizes: 2, want: true },
    C: { id: 3, prizes: 2, want: true },
    D: { id: 4, prizes: 15, want: false },
    E: { id: 5, prizes: 25, want: false },
    F: { id: 6, prizes: 25, want: false }
  });

  return(
    <div className="text-center overflow-auto">
      <div className="flex items-center justify-center gap-2">
        Cost per draw $
        <input type="number" id="rate" name="rate" className="border w-12 h-12 text-center text-xl rounded-md" min="0" defaultValue={20}/>
      </div>
      {Object.entries(prizeTiers).map(([tierName, tier])=> (
        <div key={tier.id} className="py-4 px-2">
          <h3 className="text-3xl mb-2 bg-e">
            <input 
              type="checkbox" 
              id={tier.id+"_checked"}
              defaultChecked={tier.want}
              className="mr-2 w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600"
            />
            Tier {tierName}
          </h3>
          <div>
            <div className="flex items-center justify-center gap-4">
              <input type="number" id={tier.id+'_available'} name={tier.id+'_available'} className="border w-16 h-16 text-center text-xl rounded-md" min="0" max="100" defaultValue={0}/>
              out of
              <input type="number" id={tier.id+'_total'} name={tier.id+'_total'} className="border w-16 h-16 text-center text-xl rounded-md" min="0" max="100" defaultValue={tier.prizes}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}