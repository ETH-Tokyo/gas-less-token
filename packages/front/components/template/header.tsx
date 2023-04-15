import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
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
      <ConnectButton />
    </div>
  );
};
