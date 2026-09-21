import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Usama Asghar & Co | Distribution & Retailing Company - Sama Satta, Punjab",
  description:
    "Usama Asghar & Co is a leading distribution and retailing company based in Sama Satta, supplying trusted FMCG brands across Punjab since the 1990s.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
