import { useState } from "react";

type PrizeTier = {
  id: number;
  unclaimed: number;
  prizes: number;
  want: boolean;
};

export default function Rates() {

  const [rate, setRate] = useState(20);
  const [totalPrizes, setTotalPrizes] = useState(0);
  const [selectedPrizes, setSelectedPrizes] = useState(0);
  const [prizeTiers, setPrizeTiers] = useState<Record<string, PrizeTier>>({
    A: { id: 1, unclaimed: 0, prizes: 1, want: true },
    B: { id: 2, unclaimed: 0, prizes: 2, want: true },
    C: { id: 3, unclaimed: 0, prizes: 2, want: true },
    D: { id: 4, unclaimed: 0, prizes: 15, want: false },
    E: { id: 5, unclaimed: 0, prizes: 25, want: false },
    F: { id: 6, unclaimed: 0, prizes: 25, want: false }
  });

  const handleCalculateChance = () => {
    let totalRemaining = 0;
    let remainingSelected = 0;

    Object.values(prizeTiers).forEach((tier) => {
      const remaining = tier.prizes - tier.unclaimed;

      totalRemaining += remaining;

      if (tier.want) {
        remainingSelected += remaining;
      }
    });

    setTotalPrizes(totalRemaining);
    setSelectedPrizes(remainingSelected);
  };

  const handleUpdateSelections = (tierName: string, isChecked: boolean) => {
    setPrizeTiers(prev => ({
      ...prev,
      [tierName]: {
        ...prev[tierName],
        want: isChecked
      }
    }));
  }

  const handleUpdateUnclaimed = (tierName: string, value: number) => {
    setPrizeTiers(prev => ({
      ...prev,
      [tierName]: {
        ...prev[tierName],
        unclaimed: value
      }
    }));
  };

  const handleUpdatePrizes = (tierName: string, value: number) => {
    setPrizeTiers(prev => ({
      ...prev,
      [tierName]: {
        ...prev[tierName],
        prizes: value
      }
    }));
  };

  return(
    <div className="text-center overflow-auto">
      <div className="flex items-center justify-center gap-2">
        Cost per draw $
        <input type="number" id="rate" name="rate" className="border w-12 h-12 text-center text-xl rounded-md" min="0" defaultValue={20}/>
        
      </div>
      <div className="flex items-center justify-center gap-2">
        Chance of winning selected prize(s): {totalPrizes > 0 ? ((1 - ((totalPrizes - selectedPrizes) / totalPrizes)) * 100).toFixed(2) + '%' : 'N/A'}
      </div>
      <div>
        <button className="bg-blue-400 py-2 px-4 rounded-2xl text-white hover:bg-blue-500 cursor-pointer"
        onClick={() => handleCalculateChance()}
        >
          Calculate
        </button>
      </div>
      {Object.entries(prizeTiers).map(([tierName, tier])=> (
        <div key={tier.id} className="py-4 px-2">
          <h3 className="text-3xl mb-2 bg-e">
            <input 
              type="checkbox" 
              id={tier.id+"_checked"}
              defaultChecked={tier.want}
              className="mr-2 w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600"
              onChange={(e) => handleUpdateSelections(tierName, e.target.checked)}
            />
            <label htmlFor={tier.id+"_checked"}>Tier {tierName}</label>
          </h3>
          <div>
            <div className="flex items-center justify-center gap-4">
              <input type="number" id={tier.id+'_available'} name={tier.id+'_available'} className="border w-16 h-16 text-center text-xl rounded-md" min="0" max={tier.prizes} defaultValue={0} 
              onChange={(e) => {
                handleUpdateUnclaimed(tierName, parseInt(e.target.value) || 0);
              }}
              onBlur={(e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 0) value = 0;
                if (value > prizeTiers[tierName].prizes) value = prizeTiers[tierName].prizes;
                e.target.value = value.toString();
                handleUpdateUnclaimed(tierName, value);
              }}/>
              out of
              <input
                type="number"
                id={tier.id + '_total'}
                name={tier.id + '_total'}
                className="border w-16 h-16 text-center text-xl rounded-md"
                min={0}
                max={100}
                defaultValue={prizeTiers[tierName].prizes}
                onChange={(e) => {
                  handleUpdatePrizes(tierName, parseInt(e.target.value) || 0);
                }}
                onBlur={(e) => {
                  let value = parseInt(e.target.value);
                  if (isNaN(value) || value < 0) value = 0;
                  if (value > 100) value = 100;
                  e.target.value = value.toString();
                  handleUpdatePrizes(tierName, value);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}