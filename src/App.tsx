import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import Notification from "components/notification/Notification";
import { GlobalUrls } from "enums/GlobalUrls";
import { RoleEnum } from "enums/role";
import { UserModel } from "models/user";
import CommunityStandards from "pages/communityStandards/CommunityStandards";
import Login from "pages/login/Login";
import PrivacyPolicy from "pages/privacyPolicy/PrivacyPolicy";
import Register from "pages/register/Register";
import Role from "pages/role/Role";
import User from "pages/user/User";
import Avatar from "pages/userUnboarding/avatar/Avatar";
import Background from "pages/userUnboarding/background/Background";
import Bio from "pages/userUnboarding/bio/Bio";
import Expertise from "pages/userUnboarding/expertise/Expertise";
import Origin from "pages/userUnboarding/origin/Origin";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RootState } from "redux/store";
import { HttpService } from "services/http.service";
import styles from "./App.module.scss";
import "./scss/style.scss";

function App() {
  const user = useSelector((state: RootState) => state.userReducer.user);

  HttpService.setUserToken(user?.bearerToken);

  const notificationRed = useSelector(
    (state: RootState) => state.notificationReducer
  );

  return (
    <div className={styles.app}>
      <Notification
        text={notificationRed.text}
        direction={notificationRed.direction}
        notificationType={notificationRed.type}
        refresh={notificationRed.value}
      />
      <Routes>
        <Route element={<WildRoute />}>
          <Route
            path="*"
            element={
              <main className={styles.notFound}>
                <p>There is nothing here!</p>
              </main>
            }
          />
        </Route>
        <Route element={<Authentication />}>
          <Route path={`/${GlobalUrls.login}`} element={<Login />} />
          <Route path={`/${GlobalUrls.register}`} element={<Register />} />
        </Route>

        <Route element={<UserOnboarding user={user} />}>
          <Route path={`/${GlobalUrls.role}`} element={<Role />} />
          <Route path={`/${GlobalUrls.origin}`} element={<Origin />} />
          <Route path={`/${GlobalUrls.expertise}`} element={<Expertise />} />
          <Route path={`/${GlobalUrls.background}`} element={<Background />} />
          <Route path={`/${GlobalUrls.avatar}`} element={<Avatar />} />
          <Route path={`/${GlobalUrls.bio}`} element={<Bio />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/communityStandards" element={<CommunityStandards />} />
        </Route>

        <Route element={<Protected user={user} />}>
          <Route
            path={`/${GlobalUrls.home}`}
            element={
              <main className={styles.notFound}>
                <p>Protected</p>
              </main>
            }
          />
        </Route>
      </Routes>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

const WildRoute = (props: any) => {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

const Authentication = (props: any) => {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

const UserOnboarding = (props: { user: UserModel }) => {
  const user = props.user;

  if (user?.bearerToken) {
    return (
      <div>
        <div className={styles.header}>
          <Header />
        </div>
        <Outlet />
      </div>
    );
  }
  return <Navigate to={`/${GlobalUrls.login}`} />;
};

const Protected = (props: { user: UserModel }) => {
  const user = props.user;

  if (user?.bearerToken && RoleEnum.isValid(user?.role)) {
    return (
      <div>
        <div className={styles.header}>
          <Header isProtected={true} />
        </div>
        <Outlet />
      </div>
    );
  }
  return <Navigate to={`/${GlobalUrls.role}`} />;
};

export default App;
