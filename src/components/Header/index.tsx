import Image from "next/image";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="ig.news"
          width="120rem"
          height="120rem"
        />
        <nav>
          <Link href="/">
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/post">
            <a>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};
