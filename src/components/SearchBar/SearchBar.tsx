"use client";

import { FC, FormEvent, FormEventHandler } from "react";
import styles from "./SearchBar.module.scss";
import { Search } from "lucide-react";

interface ISearchBarProps {
  endpoint: string,
}

const SearchBar: FC<ISearchBarProps> = ({endpoint}) => {

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const data = new FormData(e.currentTarget);
    const query = data.get("query") as string;

    const params = new URLSearchParams({
      q: query ?? ""
    });

    const destinationUrl = new URL("/", endpoint);
    destinationUrl.search = params.toString();

    window.open(destinationUrl, "_blank");
  }

  return <form onSubmit={onSubmit} className={styles["search-bar"]}>
    <input type="text" name="query" placeholder="Search..." className={styles["search-bar__input"]}></input>
    <Search />
  </form>;
};

export { SearchBar, type ISearchBarProps };