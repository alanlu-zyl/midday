import { Button } from "@midday/ui/button";
import Link from "next/link";
import { HeroImage } from "./hero-image";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";

export function Hero() {
  return (
    <section className="md:mt-[180px] relative h-[calc(100vh-300px)]">
      <div className="flex flex-col">
        <Link href="/updates/october-product-updates">
          <Button
            variant="outline"
            className="rounded-full border-border flex space-x-2 items-center"
          >
            <span className="font-mono text-xs">October Product Updates</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              fill="none"
            >
              <path
                fill="currentColor"
                d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
              />
            </svg>
          </Button>
        </Link>

        <h2 className="mt-6 md:mt-10 max-w-[580px] text-[#878787] leading-tight text-[36px] font-medium">
          Invoicing, Time tracking, File reconsilitation, Storage, Financial
          Overview & your own Assistant made for <WordAnimation />
        </h2>

        <div className="mt-10">
          <div className="flex items-center space-x-4">
            <Link href="/talk-to-us">
              <Button
                variant="outline"
                className="border-transparent h-11 px-6 bg-[#1D1D1D]"
              >
                Talk to us
              </Button>
            </Link>

            <a href="https://app.midday.ai">
              <Button className="h-11 px-5">Get Started</Button>
            </a>
          </div>
        </div>

        <p className="text-xs text-[#707070] mt-8 font-mono">
          30 days trial (No credit card required)
        </p>
      </div>

      <HeroImage />
      <Metrics />
    </section>
  );
}
