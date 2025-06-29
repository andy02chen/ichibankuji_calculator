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
      <div className="sticky top-0 z-10 p-2 lg:p-6 shadow-lg sm:rounded-xl bg-white 
      backdrop-blur-sm border border-gray-100">
        <h1 className="text-xl md:text-3xl font-bold text-gray-700 mb-2 lg:mb-6 text-center">
          Ichibankuji Rate Calculator
          <div className="w-2/3 h-1 mx-auto mt-3 bg-blue-400 rounded-full"></div>
        </h1>
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          <label htmlFor="rate" className="text-md md:text-lg text-gray-600 font-medium">
            Cost per draw
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              id="rate"
              name="rate"
              className="pl-8 w-24 h-12 text-center text-xl border-2 rounded-xl
              focus:border-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-100 transition-all border-blue-400"
              min="0"
              step="0.01"
              defaultValue={20}
              onChange={(e) => handleUpdateRate(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-auto sm:px-4 mb-4 mt-4 sm:mb-8 sm:mt-8">
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

      <div className="sticky bottom-0 z-10 p-2 sm:p-4 bg-white shadow-2xl sm:rounded-xl text-left overflow-x-hidden
      flex flex-col gap-4">
        <h1 className="font-bold text-xl sm:text-4xl mb-2 sm:mb-0">
          Overall Summary
        </h1>
        
        {/* Compact grid on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <div className="bg-gray-300 p-2 sm:p-4 rounded-md">
            <h1 className="text-xs sm:text-base">SELECTED</h1>
            <h1 className="text-base sm:text-3xl font-bold">{selectedPrizes}</h1>
          </div>
          <div className="bg-gray-300 p-2 sm:p-4 rounded-md">
            <h1 className="text-xs sm:text-base">TOTAL</h1>
            <h1 className="text-base sm:text-3xl font-bold">{totalPrizes}</h1>
          </div>
          <div className="bg-gray-300 p-2 sm:p-4 rounded-md">
            <h1 className="text-xs sm:text-base">WIN RATE</h1>
            <h1 className="text-base sm:text-3xl font-bold">
              {totalPrizes > 0 ? ((1 - ((totalPrizes - selectedPrizes) / totalPrizes)) * 100).toFixed(2) + '%' : 'N/A'}
            </h1>
          </div>
        </div>

        {/* Stack buttons vertically on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {Object.keys(prizeTiers).length < 26 && (
            <button
              className="w-full sm:w-auto p-2 sm:p-4 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-xl
              sm:rounded-2xl text-white font-bold text-sm sm:text-lg"
              onClick={() => handleAddTier()}
            >
              + Add Tier
            </button>
          )}
          <button
            className="w-full sm:w-auto p-2 sm:p-4 bg-gray-300 hover:bg-gray-400 cursor-pointer
            rounded-xl sm:rounded-2xl text-gray-800 font-bold flex items-center justify-center text-sm sm:text-lg"
            onClick={() => handleResetAll()}
          >
            <RotateCcw className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}