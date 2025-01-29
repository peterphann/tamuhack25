import type { ReactNode } from "react";
import { RiBook3Fill } from "react-icons/ri";

const ItineraryLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <div className="fixed bottom-20 right-20 -z-50 h-96 w-96 -rotate-45 scale-[2] opacity-[0.03]">
        <RiBook3Fill className="h-full w-full" />
      </div>
      {children}
    </>
  );
}

export default ItineraryLayout;