"use client"

import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import PostLayout from "@/app/components/layouts/PostLayout";

export default function Home() {
  return (
    <>
      <Title label="レコメンド" />
      <PostLayout />
    </>
  );
}
