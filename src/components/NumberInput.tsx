import { Input } from "@/components/ui/input";

export default function NumberInput({
  num,
  setNum,
  max,
}: {
  num: number | undefined;
  setNum: (num?: number) => void;
  max?: number;
}) {
  const numStr = num == undefined ? "" : num.toString().padStart(2, "0");
  return (
    <Input
      placeholder="--"
      inputMode="numeric"
      className="w-12 text-center"
      onKeyDown={(e) => {
        if (e.key == "Backspace" && num != undefined && num < 10)
          setNum(undefined);
      }}
      onChange={(e) => {
        const numV = Number(e.target.value);
        // console.log(numV);
        if (isNaN(numV) || (max && numV > max)) return;
        setNum(numV);
      }}
      value={numStr}
    />
  );
}
