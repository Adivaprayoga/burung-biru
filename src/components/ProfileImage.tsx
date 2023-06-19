import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
  width?: number;
  height?: number;
};
export function ProfileImage({
  src,
  className = "",
  width,
  height,
}: ProfileImageProps) {
  return (
    <div className={`${className}`}>
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <>
          <Image
            className="rounded-full border-4 border-white before:content-none"
            src={src}
            alt="Profile Image"
            quality={100}
            width={width}
            height={height}
          />
        </>
      )}
    </div>
  );
}
