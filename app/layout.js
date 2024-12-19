// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { UserProvider } from '@auth0/nextjs-auth0/client';
import {AuthProvider} from './AuthProvider';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Bundle4Africa",
  description: "Data of all accross the globe",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <html>
    
    <body>
      {children}
      
      </body>
  
  </html>
  </AuthProvider>
   
  );
}
