import "./globals.css";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import ConditionalHeader from "@/components/main/ConditionalHeader";
import ConditionalFooter from "@/components/main/ConditionalFooter";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Game Website",
  description: "This is a game website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <ConditionalHeader />
          <div className="min-h-screen">{children}</div>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
