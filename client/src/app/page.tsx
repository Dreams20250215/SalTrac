"use client"

import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import Post from "@/app/components/layouts/Post";

export default function Home() {
  return (
    <>
      <Title label="レコメンド" />
      <Post />
    </>
  );
}
