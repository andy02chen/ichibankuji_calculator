import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react"
import Prizes from "./Prizes";

export type PrizeTier = {
  id: number;
  unclaimed: number;
  prizes: number;
  want: boolean;
};

export default function Rates() {

  const [cost, setCost] = useState(20);

  const defaultPrizeTiers = useMemo(() => ({
    A: { id: 1, unclaimed: 0, prizes: 1, want: true },
    B: { id: 2, unclaimed: 0, prizes: 2, want: true },
    C: { id: 3, unclaimed: 0, prizes: 2, want: true },
    D: { id: 4, unclaimed: 0, prizes: 15, want: false },
    E: { id: 5, unclaimed: 0, prizes: 25, want: false },
    F: { id: 6, unclaimed: 0, prizes: 25, want: false }
  }), []);

  const [prizeTiers, setPrizeTiers] = useState<Record<string, PrizeTier>>(defaultPrizeTiers);

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

  const handleResetAll = () => {
    setPrizeTiers(defaultPrizeTiers);
  }

  return(
    <div className="text-center flex flex-col">
      {/* Header Section */}
      <div className="sticky top-0 z-10 p-2 shadow-lg sm:rounded-xl bg-white 
      backdrop-blur-sm border border-gray-100">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-700 mb-1 lg:mb-3 text-center">
          Ichibankuji Rate Calculator
          <div className="w-2/3 h-1 mx-auto mt-1 bg-blue-400 rounded-full"></div>
        </h1>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="rate" className="text-sm md:text-base text-gray-600 font-medium">
            Cost per draw
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              id="rate"
              name="rate"
              className="pl-8 w-20 h-8 sm:h-10 lg:h-12 text-center text-lg lg:text-base border-2 rounded-xl
              focus:border-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-100 transition-all border-blue-400"
              min="0"
              step="0.01"
              defaultValue={20}
              onChange={(e) => handleUpdateRate(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Prize Tiers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-auto px-2 my-2 ">
        <Prizes
          prizeTiers={prizeTiers}
          totalPrizes={totalPrizes}
          cost={cost}
          handleUpdateSelections={handleUpdateSelections}
          handleRemoveTier={handleRemoveTier}
          handleUpdateUnclaimed={handleUpdateUnclaimed}
          handleUpdatePrizes={handleUpdatePrizes}
        />
      </div>

      {/* Footer Section */}
      <div className="sticky bottom-0 z-10 p-2 sm:p-3 bg-white shadow-2xl sm:rounded-xl text-left overflow-x-hidden
      flex flex-col gap-1 sm:gap-2">
        <h1 className="font-bold text-lg sm:text-2xl lg:text-2xl">
          Overall Summary
        </h1>
        
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          <div className="bg-gray-300 p-2 sm:p-3 rounded-md">
            <h1 className="text-xs sm:text-sm">SELECTED</h1>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold">{selectedPrizes}</h1>
          </div>
          <div className="bg-gray-300 p-2 sm:p-3 rounded-md">
            <h1 className="text-xs sm:text-sm">TOTAL</h1>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold">{totalPrizes}</h1>
          </div>
          <div className="bg-gray-300 p-2 sm:p-3 rounded-md">
            <h1 className="text-xs sm:text-sm">WIN RATE</h1>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold">
              {totalPrizes > 0 ? ((1 - ((totalPrizes - selectedPrizes) / totalPrizes)) * 100).toFixed(2) + '%' : 'N/A'}
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-1 sm:mt-2">
          {Object.keys(prizeTiers).length < 26 && (
            <button
              className="w-full sm:w-auto p-1 sm:p-2 lg:p-3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg
              sm:rounded-xl text-white font-bold text-xs sm:text-sm lg:text-base"
              onClick={() => handleAddTier()}
            >
              + Add Tier
            </button>
          )}
          <button
            className="w-full sm:w-auto p-1 sm:p-2 lg:p-3 bg-gray-300 hover:bg-gray-400 cursor-pointer
            rounded-lg sm:rounded-xl text-gray-800 font-bold flex items-center justify-center text-xs sm:text-sm lg:text-base"
            onClick={() => handleResetAll()}
          >
            <RotateCcw className="mr-1 h-3 sm:h-4 w-3 sm:w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}