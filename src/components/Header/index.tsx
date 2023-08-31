import Image from "next/image";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

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
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/post">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};
