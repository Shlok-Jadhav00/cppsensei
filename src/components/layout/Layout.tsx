import { ReactNode } from "react";
import Navbar from "./Navbar";
import AIChatbox from "./AIChatbox";
import { useAppContext } from "@/contexts/AppContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode } = useAppContext();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />
      {children}
      <AIChatbox />
    </div>
  );
};

export default Layout;
