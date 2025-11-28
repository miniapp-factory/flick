import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };
import GameBoard from "@/components/game-board";

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return <GameBoard />;
}
