import Image from "next/image";
import { Afacad } from "next/font/google";
import {RiArrowRightSLine, RiQuestionFill } from "react-icons/ri";
const afacad = Afacad({
  subsets: ["latin"],
});
export default function Support() {
  return (
    <div className="mx-28 mb-16">
      <div className="fixed bottom-20 right-20 -z-50 h-96 w-96 -rotate-45 scale-[2] opacity-[0.03]">
        <RiQuestionFill className="h-full w-full" />
      </div>

      <div className="mt-10">
        <h1 className={"text-6xl font-bold " + afacad.className}>Having Issues?</h1>
        <p className={"mt-2 text-xl text-[#808080] " + afacad.className}>
          We&apos;re here to <span className="text-[#FF8080]">help</span>.
        </p>
        <div className="mt-8 flex gap-6">
          <div className="w-1/3 rounded-lg bg-[#F5F6F8] p-8 shadow-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  className="h-8 w-8"
                  src={"/american.png"}
                  alt="AA"
                  width="50"
                  height="50"
                />
                <p className={"text-2xl font-bold " + afacad.className}>
                  American Airlines
                </p>
              </div>
              <div>
                <p className="mt-1 mb-6">
                  Contact American Airlines for support regarding flight delay
                  times and cancellations.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p>800-433-7300</p>
                <p>american.support@aa.com</p>
              </div>
              <a href="mailto:american.support@aa.com" className="transition-all text-sm w-fit group flex items-center gap-2 hover:gap-6 rounded-3xl bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-300">
                <p>Email American Airlines</p>
                <RiArrowRightSLine className="group-hover:ml-0.5 w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="w-1/3 rounded-lg bg-[#F5F6F8] p-8 shadow-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="">
                <Image
                  src={"/flock.png"}
                  alt="AA"
                  width="125"
                  height="50"
                />
              </div>
              <div>
                <p>
                Contact Flock for support regarding our itinerary creation, hotel voucher management, and car rental services.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p>800-123-4567</p>
                <p>flock@gmail.com</p>
              </div>
              <div className="transition-all group text-sm w-fit flex items-center gap-2 hover:gap-6 rounded-3xl bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-300">
                <p>Email Flock</p>
                <RiArrowRightSLine className="group-hover:ml-0.5 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
