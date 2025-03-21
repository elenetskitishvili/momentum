import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        className="animate-pulse"
        width={350}
        height={350}
      />
    </div>
  );
}
