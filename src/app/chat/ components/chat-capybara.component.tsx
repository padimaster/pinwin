import React from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images.lib";

export default function CapybaraAvatar() {
  return (
    <div className='relative h-[80vh] w-[30vw]'>
      <div className='absolute h-[20vw] w-auto pl-[20vw]'>
        <Image
          className='h-full right-0 top-0'
          src={IMAGES.CHAT.DIALOGUE_BOX}
          width={200}
          height={200}
          alt='avatar'
        />
      </div>
      <div className='h-3/5 mt-[22.5vh]'>
        <Image
          className='w-auto h-full'
          src={IMAGES.CAPYBARA}
          width={200}
          height={200}
          alt='avatar'
        />
      </div>
    </div>
  );
}
