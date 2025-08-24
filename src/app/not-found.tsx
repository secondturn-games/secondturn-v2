import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
                        <h1 className="text-6xl font-display text-vibrant-orange">404</h1>
                <h2 className="text-2xl font-display font-semibold">This page is missing</h2>
        <p className="text-dark-green/70 max-w-md mx-auto">
          Maybe it got taken off the shelf? Don't worry, you can always browse our available games!
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button className="rounded-2xl bg-vibrant-orange text-white hover:opacity-90">
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
