import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1>
        <Button>Default button</Button>
        <Button variant="destructive" size="lg">
          <Camera />
        </Button>
      </h1>
    </div>
  );
}
