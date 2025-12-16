---
to: src/components/<%= name %>/<%= name %>.tsx
---
import { FC } from "react";
import styles from "./<%= name %>.module.scss";

interface I<%= name %>Props {

}

const <%= name %>: FC<I<%= name %>Props> = () => {
  return <div className={styles["<%= h.changeCase.param(name) %>"]}><%= name %></div>;
};

export { <%= name %>, type I<%= name %>Props };