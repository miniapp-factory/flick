import { generateMetadata } from "@/lib/farcaster-embed";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <Link href="/run">
        <Button className="text-4xl font-bold">▶️</Button>
      </Link>
    </main>
  );
}
