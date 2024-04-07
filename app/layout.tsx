import React from 'react'
import './ui/global.css'
import { roboto } from './ui/fonts'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  )
}
