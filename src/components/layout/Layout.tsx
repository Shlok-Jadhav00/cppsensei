import { ReactNode } from "react";
import Navbar from "./Navbar";
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
    </div>
  );
};

export default Layout;
