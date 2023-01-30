import * as React from "react";
import { Switch, Redirect } from "react-router-dom";
import DesktopRedirect from "~/scenes/DesktopRedirect";
import DelayedMount from "~/components/DelayedMount";
import FullscreenLoading from "~/components/FullscreenLoading";
import Route from "~/components/ProfiledRoute";
import { matchDocumentSlug as slug } from "~/utils/routeHelpers";
// import Login from "~/scenes/Login";
import Authenticated from "~/components/Authenticated";
// import AuthenticatedRoutes from "./authenticated";
// import SharedDocument from "~/scenes/Document/Shared";

const AuthenticatedRoutes = React.lazy(
  () =>
    import(
      /* webpackChunkName: "preload-authenticated-routes" */
      "./authenticated"
    )
);
const SharedDocument = React.lazy(
  () =>
    import(
      /* webpackChunkName: "shared-document" */
      "~/scenes/Document/Shared"
    )
);
const Login = React.lazy(
  () =>
    import(
      /* webpackChunkName: "login" */
      "~/scenes/Login"
    )
);
const Logout = React.lazy(
  () =>
    import(
      /* webpackChunkName: "logout" */
      "~/scenes/Logout"
    )
);

export default function Routes() {
  return (
    <React.Suspense
      fallback={
        <DelayedMount delay={2000}>
          <FullscreenLoading />
        </DelayedMount>
      }
    >
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/create" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/desktop-redirect" component={DesktopRedirect} />

        <Redirect exact from="/share/:shareId" to="/document/:shareId" />
        <Route exact path="/document/:shareId" component={SharedDocument} />

        <Redirect
          exact
          from={`/share/:shareId/doc/${slug}`}
          to={`/document/:shareId/doc/${slug}`}
        />
        <Route
          exact
          path={`/document/:shareId/doc/${slug}`}
          component={SharedDocument}
        />

        <Authenticated>
          <AuthenticatedRoutes />
        </Authenticated>
      </Switch>
    </React.Suspense>
  );
}
