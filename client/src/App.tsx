import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  return null;
}
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Hours from "./pages/Hours";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Automaten from "./pages/Automaten";
import Allergene from "./pages/Allergene";
import JobsPraktikum from "./pages/JobsPraktikum";
import Speisen from "./pages/Speisen";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0603]">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/ueber-uns" component={About} />
          <Route path="/speisekarte" component={Menu} />
          <Route path="/galerie" component={Gallery} />
          <Route path="/oeffnungszeiten" component={Hours} />
          <Route path="/kontakt" component={Contact} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/automaten" component={Automaten} />
          <Route path="/allergene" component={Allergene} />
          <Route path="/speisen" component={Speisen} />
          <Route path="/jobs-praktikum" component={JobsPraktikum} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

const wouterBase = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <WouterRouter base={wouterBase}>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </WouterRouter>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
