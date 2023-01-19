import { AnimatePresence } from "framer-motion";
import { observer, useLocalStore } from "mobx-react";
import * as React from "react";
import { Switch, Route, useLocation, matchPath } from "react-router-dom";
import ErrorSuspended from "~/scenes/ErrorSuspended";
import DocumentContext from "~/components/DocumentContext";
import type { DocumentContextValue } from "~/components/DocumentContext";
import Layout from "~/components/Layout";
import RegisterKeyDown from "~/components/RegisterKeyDown";
import Sidebar from "~/components/Sidebar";
import SidebarRight from "~/components/Sidebar/Right";
import SettingsSidebar from "~/components/Sidebar/Settings";
import type { Editor as TEditor } from "~/editor";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import history from "~/utils/history";
import DocumentHistory from "~/scenes/Document/components/History";
import DocumentInsights from "~/scenes/Document/components/Insights";
import CommandBar from "~/components/CommandBar";

import {
  searchPath,
  matchDocumentSlug as slug,
  newDocumentPath,
  settingsPath,
  matchDocumentHistory,
  matchDocumentInsights,
} from "~/utils/routeHelpers";
import Fade from "./Fade";

// const DocumentHistory = React.lazy(
//   () =>
//     import(
//       /* webpackChunkName: "document-history" */
//       "app/scenes/Document/components/History"
//     )
// );
// const DocumentInsights = React.lazy(
//   () =>
//     import(
//       /* webpackChunkName: "document-insights" */
//       "app/scenes/Document/components/Insights"
//     )
// );
// const CommandBar = React.lazy(
//   () =>
//     import(
//       /* webpackChunkName: "command-bar" */
//       "~/components/CommandBar"
//     )
// );

const AuthenticatedLayout: React.FC = ({ children }) => {
  const { ui, auth } = useStores();
  const location = useLocation();
  const can = usePolicy(ui.activeCollectionId);
  const { user, team } = auth;
  const documentContext = useLocalStore<DocumentContextValue>(() => ({
    editor: null,
    setEditor: (editor: TEditor) => {
      documentContext.editor = editor;
    },
  }));

  const goToSearch = (ev: KeyboardEvent) => {
    if (!ev.metaKey && !ev.ctrlKey) {
      ev.preventDefault();
      ev.stopPropagation();
      history.push(searchPath());
    }
  };

  const goToNewDocument = (event: KeyboardEvent) => {
    if (event.metaKey || event.altKey) {
      return;
    }
    const { activeCollectionId } = ui;
    if (!activeCollectionId || !can.update) {
      return;
    }
    history.push(newDocumentPath(activeCollectionId));
  };

  if (auth.isSuspended) {
    return <ErrorSuspended />;
  }

  const showSidebar = auth.authenticated && user && team;

  const sidebar = showSidebar ? (
    <Fade>
      <Switch>
        <Route path={settingsPath()} component={SettingsSidebar} />
        <Route component={Sidebar} />
      </Switch>
    </Fade>
  ) : undefined;

  const showHistory = !!matchPath(location.pathname, {
    path: matchDocumentHistory,
  });
  const showInsights = !!matchPath(location.pathname, {
    path: matchDocumentInsights,
  });

  const sidebarRight = (
    <AnimatePresence key={ui.activeDocumentId}>
      {(showHistory || showInsights) && (
        <Route path={`/doc/${slug}`}>
          <SidebarRight>
            <React.Suspense fallback={null}>
              {showHistory && <DocumentHistory />}
              {showInsights && <DocumentInsights />}
            </React.Suspense>
          </SidebarRight>
        </Route>
      )}
    </AnimatePresence>
  );

  return (
    <DocumentContext.Provider value={documentContext}>
      <Layout title={team?.name} sidebar={sidebar} sidebarRight={sidebarRight}>
        <RegisterKeyDown trigger="n" handler={goToNewDocument} />
        <RegisterKeyDown trigger="t" handler={goToSearch} />
        <RegisterKeyDown trigger="/" handler={goToSearch} />
        {children}
        <CommandBar />
      </Layout>
    </DocumentContext.Provider>
  );
};

export default observer(AuthenticatedLayout);
