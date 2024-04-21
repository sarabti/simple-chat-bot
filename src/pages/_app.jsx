import React from "react";
import Head from 'next/head'
import '../styles/index.css'

export default function MyApp({Component, pageProps}) {
  return (
   <>
     <Head>
       <title>Simple Chat</title>
       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
     </Head>
     <Component {...pageProps} />
   </>
 )
}
