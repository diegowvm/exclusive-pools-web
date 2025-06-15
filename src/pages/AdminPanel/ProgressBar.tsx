
export function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full flex items-center gap-1 mb-3">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded ${i < currentStep ? "bg-blue-500" : "bg-blue-200"}`}
        />
      ))}
    </div>
  );
}
