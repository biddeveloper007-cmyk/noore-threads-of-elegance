import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-6 py-3 text-xs tracking-widest text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
          >
            Return to NOORÉ Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs tracking-widest text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NOORÉ | Elegance in Every Thread — Premium Pakistani Fashion" },
      {
        name: "description",
        content:
          "Discover luxury Pakistani fashion for women — unstitched lawn, ready-to-wear, embroidered chiffon, festive velvet & pret collections by NOORÉ.",
      },
      { name: "author", content: "NOORÉ" },
      { property: "og:title", content: "NOORÉ | Elegance in Every Thread" },
      {
        property: "og:description",
        content:
          "Contemporary Pakistani women's fashion celebrating timeless craftsmanship and effortless elegance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nooreofficial" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-[var(--cream)] text-foreground font-sans">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <CartDrawer />
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

