import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/shared/navber";
import { getMe } from "@/services/getMe";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="">
        <Toaster position="top-right" richColors />
        <Navbar user={user} />
        {/* Navbar */}
        {children}

        {/* Footer */}
      </body>
    </html>
  );
}
