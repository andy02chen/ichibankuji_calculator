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
  '1': 'text-red-400',
  '2': 'text-orange-400',
  '3': 'text-amber-400',
  '4': 'text-yellow-400',
  '5': 'text-lime-400',
  '6': 'text-green-400',
  '7': 'text-emerald-400',
  '8': 'text-teal-400',
  '9': 'text-cyan-400',
  '10': 'text-sky-400',
  '11': 'text-blue-400',
  '12': 'text-indigo-400',
  '13': 'text-violet-400',
  '14': 'text-purple-400',
  '15': 'text-fuchsia-400',
  '16': 'text-pink-400',
  '17': 'text-rose-400',
  '18': 'text-red-400',
  '19': 'text-orange-400',
  '20': 'text-amber-400',
  '21': 'text-yellow-400',
  '22': 'text-lime-400',
  '23': 'text-green-400',
  '24': 'text-emerald-400',
  '25': 'text-teal-400',
  '26': 'text-cyan-400'
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
          <div key={tier.id} className="bg-white rounded-2xl">
            <div className={`${tierBGColors[tier.id]} text-3xl mb-2 rounded-t-2xl p-4 border-t-4 ${tierColors[tier.id]}`}>
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  id={tier.id + "_checked"}
                  checked={tier.want}
                  className="mr-2 w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                  onChange={(e) => {
                    handleUpdateSelections(tierName, e.target.checked);
                  }}
                />
                <label className="cursor-pointer font-bold" htmlFor={tier.id + "_checked"}>Tier {tierName}</label>
                {(Object.keys(prizeTiers).length === tier.id && tier.id !== 1) &&
                (<button className="cursor-pointer bg-red-400 text-white font-bold px-1.5 rounded-sm hover:bg-red-500 mx-2"
                onClick={() => handleRemoveTier()}>
                  &#10005;
                </button>)
                ||
                null
                }
              </div>
            </div>
            <div className="p-4 text-left">
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="w-[90%]">
                  <h1>
                    Claimed
                  </h1>
                  <input
                    type="number"
                    id={tier.id + '_available'}
                    name={tier.id + '_available'}
                    className="border w-full h-16 text-xl rounded-md pl-4"
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
                  <h1>
                    Total
                  </h1>
                  <input
                    type="number"
                    id={tier.id + '_total'}
                    name={tier.id + '_total'}
                    className="border w-full h-16 text-xl rounded-md pl-4"
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

            <div className={`bg-white p-1 grid grid-cols-3 gap-1 lg:gap-4 lg:p-4 rounded-md`}>
              {['LEFT', 'WIN RATE', 'COST'].map((label, index) => (
                <div 
                  key={label}
                  className={`${tierBGColors[tier.id]} rounded p-3 flex flex-col items-center`}
                >
                  <h1 className={`text-xs lg:text-xl mb-1 ${tierTextColors[tier.id]} font-bold`}>
                    {label}
                  </h1>
                  <h1 className="font-bold text-base lg:text-2xl">
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