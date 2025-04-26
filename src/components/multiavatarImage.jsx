"use client";

import React from "react";
import multiavatar from "@multiavatar/multiavatar/esm";
import Image from "next/image";

export default function MultiavatarImage({
  avatarId,
  size = 48,
  className = "",
}) {
  if (!avatarId) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 rounded-full ${className}`}
        style={{ width: size, height: size, fontSize: size / 2 }}
      >
        ?
      </div>
    );
  }

  const svgString = multiavatar(avatarId.toString());
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

  return (
    <Image
      src={svgDataUrl}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
