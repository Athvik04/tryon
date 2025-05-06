import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Updated font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster for notifications

const inter = Inter({ // Updated font
  variable: '--font-inter', // Updated font variable
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Virtual Tailor', // Updated app title
  description: 'Your personal AI-powered virtual try-on experience.', // Updated app description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}> {/* Updated font class */}
        {children}
        <Toaster /> {/* Added Toaster component */}
      </body>
    </html>
  );
}
