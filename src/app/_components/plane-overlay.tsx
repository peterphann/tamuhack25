import { RiPlaneFill } from "react-icons/ri";

export default function PlaneOverlay() {

    return <div className="fixed bottom-20 right-20 -z-50 h-96 w-96 -rotate-45 scale-[2.5] opacity-5">
        <RiPlaneFill className="h-full w-full" />
    </div>
}