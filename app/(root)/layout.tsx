import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-dark-2">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
