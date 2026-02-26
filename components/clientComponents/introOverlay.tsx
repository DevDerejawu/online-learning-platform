"use client";

import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function IntroOverlay({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/70 text-white p-2 rounded-full hover:bg-black"
      >
        <X className="w-5 h-5 cursor-pointer" />
      </button>

      {/* Video */}
      <video
        src="/video/intro.mkv"
        className="w-full h-full object-cover"
        controls
        autoPlay
      />
    </div>
  );
}