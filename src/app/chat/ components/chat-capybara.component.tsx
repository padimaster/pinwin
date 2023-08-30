import React from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images.lib";

export default function CapybaraAvatar() {
  return (
    <div className='hidden md:flex justify-end items-center h-[50vh]'>
      <div className='h-full'>
        <Image
          className='w-auto h-full'
          src={IMAGES.AVATAR}
          width={200}
          height={200}
          alt='avatar'
        />
      </div>
    </div>
  );
}
