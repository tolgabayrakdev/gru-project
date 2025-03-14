export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}