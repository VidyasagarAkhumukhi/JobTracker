import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/logoFront.png";
import LandingImg from "../assets/jobhunt.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl px-4 sm:px-8 py-6 ">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="max-w-8xl mx-auto px-4 sm:px-8 h-20 -mt-10 grid lg:grid-cols-2 items-center gap-5">
        <div className="items-center mx-auto">
          <h1 className="capitalize text-5xl md:text-8xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-4xl mt-4 ">
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>

        <div className="hidden lg:block mx-auto">
          <Image
            src={LandingImg}
            alt="landing"
            // Set a fixed width and height here
            width={500}
            height={500}
            priority
          />
        </div>
      </section>
    </main>
  );
}
