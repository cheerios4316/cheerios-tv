"use client";

import { FC, FormEvent, FormEventHandler, useRef } from "react";
import styles from "./SearchBar.module.scss";
import { Search } from "lucide-react";

interface ISearchBarProps {
  endpoint: string,
}

const SearchBar: FC<ISearchBarProps> = ({endpoint}) => {

  const ref = useRef<HTMLFormElement|null>(null);

  const searchClick = () => {
    ref.current?.requestSubmit();
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const data = new FormData(e.currentTarget);
    const query = data.get("query") as string;

    if(query.trim().length === 0) {
      return;
    }

    const params = new URLSearchParams({
      q: query ?? ""
    });

    const destinationUrl = new URL("/", endpoint);
    destinationUrl.search = params.toString();

    window.open(destinationUrl, "_blank");
  }

  return <form ref={ref} onSubmit={onSubmit} className={styles["search-bar"]}>
    <input type="text" name="query" placeholder="Search..." className={styles["search-bar__input"]}></input>
    <Search onClick={searchClick}/>
  </form>;
};

export { SearchBar, type ISearchBarProps };