"use client";
export default function Error({ reset }) {
  return <main style={{padding:"140px 24px",maxWidth:900,margin:"auto"}}><h1>Property details are temporarily unavailable.</h1><p>Please try again or contact our team.</p><button onClick={reset}>Try again</button> <a href="/projects#enquiry">Contact Amigos Immo</a></main>;
}
