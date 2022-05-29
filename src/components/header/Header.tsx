import {
  HeaderChatIcon,
  HeaderNotificationIcon,
  RegensLogo,
} from "assets/svg/icons";
import InputComponent from "components/elements/input/Input";
import { GlobalUrls } from "enums/GlobalUrls";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = ({ isProtected }: { isProtected?: boolean }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.header}>
      <Link className={styles.logo} to={`/${GlobalUrls.home}`}>
        <RegensLogo />
        <span className={styles.title}> {t("header.company_name")}</span>
      </Link>

      {isProtected && (
        <div className={styles.authenticated}>
          <Link to={`/${GlobalUrls.learn}`}>
            <span className={styles.title}>
              {t("header.education_navigation")}
            </span>
          </Link>

          <div className={styles.search}>
            <InputComponent placeholder={t("header.search")} />
          </div>

          <Link to={`/${GlobalUrls.home}`}>
            <HeaderChatIcon />
          </Link>

          <Link to={`/${GlobalUrls.home}`}>
            <HeaderNotificationIcon />
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
