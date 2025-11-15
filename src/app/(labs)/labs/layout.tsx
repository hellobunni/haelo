import type React from "react";
import LabsFooter from "@/components/layout/labs-footer/labsFooter";
import LabHeader from "@/components/layout/labs-header/labHeader";
import { ThemeProvider } from "@/components/providers/theme-provider";

const LabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-slate-950 text-white dark relative overflow-x-hidden">
        <LabHeader />

        {children}
        <LabsFooter />
      </div>
    </ThemeProvider>
  );
};

export default LabsLayout;
