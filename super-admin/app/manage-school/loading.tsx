import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="p-6 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-100/80">
      <Loader2 className="animate-spin w-32 h-32" />
    </div>
  );
};

export default Loading;
