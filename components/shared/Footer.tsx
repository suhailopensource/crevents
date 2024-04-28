import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={38}
          />
        </Link>

        <p className="text-white">2024 Crevents. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
