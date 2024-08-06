import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBox from "@/components/SearchBox";
import Svg from "@/components/Svg";
import Tasks from "@/components/Tasks";
import { SearchParams } from "@/utils/types";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {

  return (
    <>
      <Svg>
        <div className="absolute inset-0 opacity-20 h-full w-full bg-blue-500 " />
        <MaxWidthWrapper className="relative z-10">
          <div className='py-16 mx-auto text-center flex flex-col items-center max-w-3xl'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Your Ultimate  Destination for <span className='bg-gradient-to-r from-yellow-500 to-primary inline-block text-transparent bg-clip-text'>Task management</span>
            </h1>
            <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
              Welcome to TaskCraft, your go-to platform for efficient task management. Stay organized and boost your productivity with our powerful features
            </p>
            <Suspense>
              <SearchBox className="w-4/5 mt-12" />
            </Suspense>
          </div>
        </MaxWidthWrapper>
      </Svg>
      <Tasks searchParams={searchParams} className="py-10" />
    </>
  );
}
