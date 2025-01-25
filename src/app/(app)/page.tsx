import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";
import { afacad } from "../layout";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="plane fixed top-0 left-0 -z-50">
        <Image src={"/plane.png"} alt="Plane Banner" width="3000" height="1250" />
      </div>

      <div className={"mx-32 mt-10"}>
        <h1 className={"text-6xl font-bold " + afacad.className}>
          Make delays more managable!
        </h1>

        <h2 className="mt-4 text-xl w-5/12">
          Get easy access to hotel vouchers and itinerary planning in the city you&apos;re delayed in.
        </h2>
      </div>

    </HydrateClient>
  );
}
