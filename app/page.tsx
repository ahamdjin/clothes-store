import dynamic from "next/dynamic";

const ShowcaseCanvas = dynamic(() => import("@/components/ShowcaseCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <ShowcaseCanvas />
    </main>
  );
}
