import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseQuest",
  description: "a Course Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
