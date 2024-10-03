import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from './components/sub/ReduxProvider';

export const metadata: Metadata = {
  title: "CourseQuest",
  description: "A Course Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider> {}
      </body>
    </html>
  );
}
