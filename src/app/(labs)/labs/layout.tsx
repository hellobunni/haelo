import React from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'

const LabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-slate-950 text-white dark">
        {children}
      </div>
    </ThemeProvider>
  )
}

export default LabsLayout