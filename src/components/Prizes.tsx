import type { PrizeTier } from "./Rates";

type PrizeProps = {
  prizeTiers: Record<string, PrizeTier>;
  totalPrizes: number;
  cost: number;
  handleUpdateSelections: (tierName: string, isChecked: boolean) => void;
  handleRemoveTier: () => void;
  handleUpdateUnclaimed: (tierName: string, value: number) => void;
  handleUpdatePrizes: (tierName: string, value: number) => void;
}

const tierColors: Record<string, string> = {
  '1': 'border-red-400',
  '2': 'border-orange-400',
  '3': 'border-amber-400',
  '4': 'border-yellow-400',
  '5': 'border-lime-400',
  '6': 'border-green-400',
  '7': 'border-emerald-400',
  '8': 'border-teal-400',
  '9': 'border-cyan-400',
  '10': 'border-sky-400',
  '11': 'border-blue-400',
  '12': 'border-indigo-400',
  '13': 'border-violet-400',
  '14': 'border-purple-400',
  '15': 'border-fuchsia-400',
  '16': 'border-pink-400',
  '17': 'border-rose-400',
  '18': 'border-red-400',
  '19': 'border-orange-400',
  '20': 'border-amber-400',
  '21': 'border-yellow-400',
  '22': 'border-lime-400',
  '23': 'border-green-400',
  '24': 'border-emerald-400',
  '25': 'border-teal-400',
  '26': 'border-cyan-400'
};

const tierTextColors: Record<string, string> = {
  '1': 'text-red-600',
  '2': 'text-orange-600',
  '3': 'text-amber-600',
  '4': 'text-yellow-600',
  '5': 'text-lime-600',
  '6': 'text-green-600',
  '7': 'text-emerald-600',
  '8': 'text-teal-600',
  '9': 'text-cyan-600',
  '10': 'text-sky-600',
  '11': 'text-blue-600',
  '12': 'text-indigo-600',
  '13': 'text-violet-600',
  '14': 'text-purple-600',
  '15': 'text-fuchsia-600',
  '16': 'text-pink-600',
  '17': 'text-rose-600',
  '18': 'text-red-600',
  '19': 'text-orange-600',
  '20': 'text-amber-600',
  '21': 'text-yellow-600',
  '22': 'text-lime-600',
  '23': 'text-green-600',
  '24': 'text-emerald-600',
  '25': 'text-teal-600',
  '26': 'text-cyan-600'
};

const tierBGColors: Record<string, string> = {
  '1': 'bg-red-200',
  '2': 'bg-orange-200',
  '3': 'bg-amber-200',
  '4': 'bg-yellow-200',
  '5': 'bg-lime-200',
  '6': 'bg-green-200',
  '7': 'bg-emerald-200',
  '8': 'bg-teal-200',
  '9': 'bg-cyan-200',
  '10': 'bg-sky-200',
  '11': 'bg-blue-200',
  '12': 'bg-indigo-200',
  '13': 'bg-violet-200',
  '14': 'bg-purple-200',
  '15': 'bg-fuchsia-200',
  '16': 'bg-pink-200',
  '17': 'bg-rose-200',
  '18': 'bg-red-200',
  '19': 'bg-orange-200',
  '20': 'bg-amber-200',
  '21': 'bg-yellow-200',
  '22': 'bg-lime-200',
  '23': 'bg-green-200',
  '24': 'bg-emerald-200',
  '25': 'bg-teal-200',
  '26': 'bg-cyan-200'
};

export default function Prizes({
  prizeTiers,
  totalPrizes,
  cost,
  handleUpdateSelections,
  handleRemoveTier,
  handleUpdateUnclaimed,
  handleUpdatePrizes
}: PrizeProps) {

  return(
    <>
      {Object.entries(prizeTiers).map(([tierName, tier]) => {
        const remaining = Math.max(0, tier.prizes - tier.unclaimed);
        const chance = totalPrizes > 0 ? ((remaining / totalPrizes) * 100): 0;

        return (
          <div key={tier.id} className="bg-white rounded-xl lg:rounded-2xl">
            <div className={`${tierBGColors[tier.id]} text-xl lg:text-2xl mb-1 rounded-t-xl lg:rounded-t-2xl p-2 sm:p-3 border-t-4 ${tierColors[tier.id]}`}>
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  id={tier.id + "_checked"}
                  checked={tier.want}
                  className="mr-2 w-4 h-4 lg:w-5 lg:h-5 text-blue-600 bg-white border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                  onChange={(e) => {
                    handleUpdateSelections(tierName, e.target.checked);
                  }}
                />
                <label className="text-base md:text-lg lg:text-xl cursor-pointer font-bold" htmlFor={tier.id + "_checked"}>Tier {tierName}</label>
                {(Object.keys(prizeTiers).length === tier.id && tier.id !== 1) &&
                (<button className="cursor-pointer bg-red-400 text-white font-bold px-1 rounded-sm hover:bg-red-600 mx-1 lg:mx-2 text-sm lg:text-base"
                onClick={() => handleRemoveTier()}>
                  &#10005;
                </button>)
                ||
                null
                }
              </div>
            </div>
            <div className="p-2 sm:p-3 text-left">
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
                <div className="w-[90%]">
                  <h1 className="text-sm lg:text-base">
                    Claimed
                  </h1>
                  <input
                    type="number"
                    id={tier.id + '_available'}
                    name={tier.id + '_available'}
                    className="border w-full h-10 text-base lg:text-lg rounded-md pl-3 lg:pl-4"
                    min="0"
                    max={tier.prizes}
                    value={tier.unclaimed}
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
                </div>
                <div className="w-[90%]">
                  <h1 className="text-sm lg:text-base">
                    Total
                  </h1>
                  <input
                    type="number"
                    id={tier.id + '_total'}
                    name={tier.id + '_total'}
                    className="border w-full h-10 text-base lg:text-lg rounded-md pl-3 lg:pl-4"
                    min={0}
                    max={100}
                    value={tier.prizes}
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

            <div className={`bg-white p-1 sm:p-2 grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 rounded-b-xl lg:rounded-b-2xl`}>
              {['LEFT', 'WIN RATE', 'COST'].map((label) => (
                <div 
                  key={label}
                  className={`${tierBGColors[tier.id]} rounded p-2 flex flex-col items-center`}
                >
                  <h1 className={`text-xs lg:text-sm mb-1 ${tierTextColors[tier.id]} font-bold`}>
                    {label}
                  </h1>
                  <h1 className="font-bold text-sm sm:text-base">
                    {label === 'LEFT' && remaining}
                    {label === 'WIN RATE' && `${chance.toFixed(2)}%`}
                    {label === 'COST' && chance > 0 && `~$${(100/chance * cost).toFixed(2)}`}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}