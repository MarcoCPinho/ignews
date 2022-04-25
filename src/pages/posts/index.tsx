import Head from "next/head";
import React from "react";
import styles from "./styles.module.scss";

// import { Container } from './styles';

export const posts: React.FC = () => {
  return (
    <>
      <Head>
        <title>Posts | IGnews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a more blabla</strong>
            <p>conteúdo do post</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a more blabla</strong>
            <p>conteúdo do post</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a more blabla</strong>
            <p>conteúdo do post</p>
          </a>
        </div>
      </main>
    </>
  );
};
