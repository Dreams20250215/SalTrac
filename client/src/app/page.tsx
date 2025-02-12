"use client"

import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import PostForm from "@/app/components/layouts/PostForm";

export default function Home() {
  return (
    <div>
      <Title label="投稿する" />
      <PostForm />
      <Title label="投稿一覧" />
      </div>
  );
}
