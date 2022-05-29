import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.scss";

const Home = () => {
  const { t } = useTranslation();

  return <div className={styles.home}>Home</div>;
};

export default Home;
