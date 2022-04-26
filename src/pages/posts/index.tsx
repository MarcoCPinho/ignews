import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";

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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
  };
};
