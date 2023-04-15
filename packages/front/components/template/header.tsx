import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const Header = () => {
  const router = useRouter();
  const isOwner = useMemo(() => router.pathname === "/owner", []);

  return (
    <div className="flex flex-row justify-between items-center mb-16">
      <div>
        <Link href="/">
          <Image
            src="/logo/gasslesstoken.png"
            alt="gasslesstoken"
            width={150}
            height={100}
          />
        </Link>
      </div>
      {isOwner && <ConnectButton />}
    </div>
  );
};
