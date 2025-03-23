import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { supabaseClient } from "./utility";
import { Divider, Typography } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={useNotificationProvider}
              // resources={[
              //   {
              //     name: "blog_posts",
              //     list: "/blog-posts",
              //     create: "/blog-posts/create",
              //     edit: "/blog-posts/edit/:id",
              //     show: "/blog-posts/show/:id",
              //     meta: {
              //       canDelete: true,
              //     },
              //   },
              //   {
              //     name: "categories",
              //     list: "/categories",
              //     create: "/categories/create",
              //     edit: "/categories/edit/:id",
              //     show: "/categories/show/:id",
              //     meta: {
              //       canDelete: true,
              //     },
              //   },
              // ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "ebsxDE-gB5rAF-7Eq9tC",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2 Header={Header}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <>
                        <AuthPage
                          type="login"
                          hideForm={true}
                          registerLink={<></>}
                          title={
                            <>
                              <Typography variant="h6">
                                Centralized Pisonet Cloud Application Portal
                              </Typography>
                            </>
                          }
                          providers={[
                            {
                              name: "google",
                              label: "Sign in with Google",
                            },
                          ]}
                        />
                      </>
                    }
                  />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
