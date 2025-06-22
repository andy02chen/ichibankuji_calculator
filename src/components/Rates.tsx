import { useMemo, useState } from "react";

type PrizeTier = {
  id: number;
  unclaimed: number;
  prizes: number;
  want: boolean;
};

export default function Rates() {

  const [cost, setCost] = useState(20);
  const [prizeTiers, setPrizeTiers] = useState<Record<string, PrizeTier>>({
    A: { id: 1, unclaimed: 0, prizes: 1, want: true },
    B: { id: 2, unclaimed: 0, prizes: 2, want: true },
    C: { id: 3, unclaimed: 0, prizes: 2, want: true },
    D: { id: 4, unclaimed: 0, prizes: 15, want: false },
    E: { id: 5, unclaimed: 0, prizes: 25, want: false },
    F: { id: 6, unclaimed: 0, prizes: 25, want: false }
  });

  const { totalPrizes, selectedPrizes } = useMemo(() => {
    let totalRemaining = 0;
    let remainingSelected = 0;

    Object.values(prizeTiers).forEach((tier) => {
      const remaining = Math.max(0, tier.prizes - tier.unclaimed);

      totalRemaining += remaining;

      if (tier.want) {
        remainingSelected += remaining;
      }
    });

    return { totalPrizes: totalRemaining, selectedPrizes: remainingSelected };
  }, [prizeTiers]);

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

  const handleUpdateRate = (cost: number) => {
    setCost(cost);
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

  const handleAddTier = () => {
    const nextIndex = Object.keys(prizeTiers).length;
    const nextLetter = String.fromCharCode('A'.charCodeAt(0) + nextIndex);

    setPrizeTiers(prev => ({
      ...prev,
      [nextLetter]: {
        id: nextIndex + 1,
        unclaimed: 0,
        prizes: 25,
        want: false
      }
    }));
  }

  const handleRemoveTier = () => {
    const keys = Object.keys(prizeTiers);
    if (keys.length === 0) return;

    const removeIndex = keys.length - 1;
    const removeLetter = String.fromCharCode('A'.charCodeAt(0) + removeIndex);
    const copy = { ...prizeTiers };

    delete copy[removeLetter];

    setPrizeTiers(copy);
  }

  return(
    <div className="text-center">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Ichibankuji Rate Calculator
        </h1>
        <div className="flex items-center justify-center gap-2">
          Cost per draw $
          <input type="number" id="rate" name="rate" className="border w-12 h-12 text-center text-xl rounded-md" min="0" defaultValue={20}
          onChange={(e) => handleUpdateRate(parseFloat(e.target.value))}/>
        </div>
        <div className="flex items-center justify-center gap-2">
          Chance of winning selected prize(s): {totalPrizes > 0 ? ((1 - ((totalPrizes - selectedPrizes) / totalPrizes)) * 100).toFixed(2) + '%' : 'N/A'}
        </div>
      </div>
      {Object.entries(prizeTiers).map(([tierName, tier]) => {
        const remaining = Math.max(0, tier.prizes - tier.unclaimed);
        const chance = totalPrizes > 0 ? ((remaining / totalPrizes) * 100): 0;

        return (
          <div key={tier.id} className="py-4 px-2">
            <div className="text-3xl mb-2 bg-e">
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  id={tier.id + "_checked"}
                  defaultChecked={tier.want}
                  className="mr-2 w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                  onChange={(e) => {
                    handleUpdateSelections(tierName, e.target.checked);
                  }}
                />
                <label className="cursor-pointer" htmlFor={tier.id + "_checked"}>Tier {tierName}</label>
                {(Object.keys(prizeTiers).length === tier.id && tier.id !== 1) &&
                (<button className="cursor-pointer bg-red-400 text-white font-bold px-1.5 rounded-sm hover:bg-red-500 mx-2"
                onClick={() => handleRemoveTier()}>
                  &#10005;
                </button>)
                ||
                null
                }
              </div>
              <h1>{chance.toFixed(2)  + "%"}</h1>
              {chance > 0 && 
                (<h1>~${(100/chance * cost).toFixed(2)}</h1>)
                ||
                null
              }
              
            </div>
            <div>
              <div className="flex items-center justify-center gap-4">
                <input
                  type="number"
                  id={tier.id + '_available'}
                  name={tier.id + '_available'}
                  className="border w-16 h-16 text-center text-xl rounded-md"
                  min="0"
                  max={tier.prizes}
                  defaultValue={0}
                  onChange={(e) => {
                    handleUpdateUnclaimed(tierName, parseInt(e.target.value) || 0);
                  }}
                  onBlur={(e) => {
                    let value = parseInt(e.target.value);
                    if (isNaN(value) || value < 0) value = 0;
                    if (value > prizeTiers[tierName].prizes) value = prizeTiers[tierName].prizes;
                    e.target.value = value.toString();
                    handleUpdateUnclaimed(tierName, value);
                  }}
                />
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
        );
      })}
      {Object.keys(prizeTiers).length < 26 &&
        (<button className="p-4 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-2xl text-white"
        onClick={() => handleAddTier()}>
          New Tier
        </button>)
        ||
        null
      }
    </div>
  );
}