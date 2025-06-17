import { useState } from "react";

export default function Rates() {

  const [totalPrizes, setTotalPrizes] = useState(0);
  const [prizeTiers, setPrizeTiers] = useState({
    A: { id: 1, prizes: 1 },
    B: { id: 2, prizes: 2 },
    C: { id: 3, prizes: 2 }
  });

  return(
    <div className="text-center">
      {Object.entries(prizeTiers).map(([tierName, tier])=> (
        <div key={tier.id} className="py-4 px-2">
          <h3 className="text-3xl mb-2">
            Tier {tierName}
          </h3>
          <div>
            <div className="flex items-center justify-center gap-4">
              <input type="number" id={tier.id+'_available'} name={tier.id+'_available'} className="border w-15 h-15 text-center text-xl rounded-md" min="0" max="100" defaultValue={0}/>
              out of
              <input type="number" id={tier.id+'_total'} name={tier.id+'_total'} className="border w-15 h-15 text-center text-xl rounded-md" min="0" max="100" defaultValue={tier.prizes}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}