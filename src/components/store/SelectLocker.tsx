import { useState, useEffect } from "react";
import StepWrapper from "../StepWrapper";

interface SelectLockerProps {
  selected: string | null;
  onSelect: (boxId: string) => void;
  onBack: () => void;
}

interface Box {
  id: string;
  name: string;
  type: string;
  status: 'EMPTY_CLOSED' | 'BOOKED';
  gridArea: string; // Tells Tailwind exactly where to put this box
}

const SelectLocker = ({ selected, onSelect, onBack }: SelectLockerProps) => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    // Hardcoding the exact layout from the reference image
    const layoutConfig = [
      { id: 'B-1', name: 'B-1', type: 'Medium', gridArea: 'col-start-1 row-start-1 row-span-2' },
      { id: 'A-1', name: 'A-1', type: 'Small', gridArea: 'col-start-2 row-start-1 row-span-1' },
      { id: 'A-2', name: 'A-2', type: 'Small', gridArea: 'col-start-2 row-start-2 row-span-1' },
      { id: 'B-2', name: 'B-2', type: 'Medium', gridArea: 'col-start-1 row-start-3 row-span-2' },
      { id: 'A-3', name: 'A-3', type: 'Small', gridArea: 'col-start-2 row-start-3 row-span-1' },
      { id: 'A-4', name: 'A-4', type: 'Small', gridArea: 'col-start-2 row-start-4 row-span-1' },
      { id: 'C-1', name: 'C-1', type: 'Large', gridArea: 'col-start-1 row-start-5 row-span-3' },
      { id: 'C-2', name: 'C-2', type: 'Large', gridArea: 'col-start-2 row-start-5 row-span-3' },
    ];

    const mockBoxes = layoutConfig.map(box => ({
      ...box,
      // Randomly simulate some boxes being taken (30% chance)
      status: (Math.random() > 0.3) ? 'EMPTY_CLOSED' : 'BOOKED' as const
    }));

    setBoxes(mockBoxes);
  }, []);

  return (
    <StepWrapper
      title="Select Specific Locker"
      subtitle="Choose the exact box location on the terminal"
      onBack={onBack}
      step={4}
      totalSteps={7}
    >
      <div className="flex justify-center w-full my-4">
        {/* The Purple Terminal Background */}
        <div className="bg-[#8b5cf6] p-3 rounded-xl w-full max-w-[280px] shadow-inner">

          {/* The 2-Column, 7-Row Grid System */}
          <div className="grid grid-cols-2 grid-rows-7 gap-3 h-[500px]">
            {boxes.map((box) => {
              const isAvailable = box.status === 'EMPTY_CLOSED';
              const isSelected = selected === box.id;

              return (
                <button
                  key={box.id}
                  onClick={() => isAvailable && onSelect(box.id)}
                  disabled={!isAvailable}
                  className={`
                    relative flex flex-col items-center justify-center rounded-lg transition-all
                    ${box.gridArea} /* Injects the specific row/col span */
                    ${!isAvailable
                      ? 'bg-gray-400 opacity-60 cursor-not-allowed border-transparent'
                      : 'bg-[#e5e7eb] hover:bg-white cursor-pointer shadow-sm border-2 border-transparent hover:border-blue-400'
                    }
                    ${isSelected
                      ? '!bg-white border-blue-600 ring-2 ring-blue-500 shadow-md'
                      : ''
                    }
                  `}
                >
                  <span className={`text-lg font-medium ${!isAvailable ? 'text-gray-600' : 'text-gray-900'}`}>
                    {box.name}
                  </span>
                  <span className={`text-sm ${!isAvailable ? 'text-gray-600' : 'text-gray-700'}`}>
                    ({box.type})
                  </span>

                  {/* Red dot indicator for taken boxes */}
                  {!isAvailable && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};

export default SelectLocker;