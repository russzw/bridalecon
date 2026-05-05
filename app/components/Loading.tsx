// app/components/Loading.tsx
import { Globe2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[hsl(var(--brand-500)/0.2)] rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[hsl(var(--brand-500))] border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
           <Globe2 className="w-6 h-6 text-[hsl(var(--brand-500))] animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium text-[hsl(var(--text-muted))] animate-pulse">
        Fetching global data...
      </p>
    </div>
  );
};

export default Loading;
