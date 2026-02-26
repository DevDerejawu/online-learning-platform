"use client";

import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function IntroOverlay({ onClose }: Props) {
  
  const videoId = "1CZSbrp5RZChxxb130I9lB-gLU_iLEHwH";
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">

      <button
        onClick={onClose}
        className="absolute top-0 cursor-pointer mt-2 right-1 z-[110] bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all border border-white/30"
      >
        <X className="w-6 h-6" />
      </button>

    
      <div className="w-full h-full max-w-5xl aspect-video px-4">
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg border-0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}