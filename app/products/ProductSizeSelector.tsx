import { Button } from "@/components/ui/button";

interface SizeProps {
  sizes?: string[]; // optional now to prevent crashes
  selectedSize: string;
  weight: number;
  onSelect: (size: string) => void;
}


export function ProductSizeSelector({
  sizes = [],
  selectedSize,
  weight,
  onSelect,
}: SizeProps) {

  const validWeight = Number(weight) > 0;
  // If sizes is empty, show a fallback message instead of crashing
  if (validWeight > 0) {
    return <p className="text-gray-500">No sizes available {Number(weight)}</p>;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {/* {sizes.map((size) => ( <Button key={size} variant={selectedSize === size ? "default" : "outline"} onClick={() => onSelect(size)} > {size} </Button> ))} */}
      <span className="font-semibold">Weight:</span>
      <span>{Number(weight)} gm</span>
    </div>
  );
}
