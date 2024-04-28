import React, { ReactNode } from 'react'
import { ThemeProvider } from "@/components/shared/Theme-provider"


const layout = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div>{children}</div>
        </ThemeProvider>
    )
}

export default layout