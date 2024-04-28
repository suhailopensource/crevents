import React, { ReactNode } from 'react'
import { ThemeProvider } from "@/components/shared/Theme-provider"
import { ModeToggle } from "@/components/shared/Theme-toggler"

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div>{children}</div>
        </ThemeProvider>
    )
}

export default layout