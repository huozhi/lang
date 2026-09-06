import type { ReactNode } from 'react'
import './globals.css'

type LayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <title>langsagne</title>
      <meta name="description" content="minimal programming language parser and execution experiment" />
      <div className="mx-auto min-h-screen w-full max-w-[920px] px-5 pb-12 max-[47.5rem]:pb-8">
        <header className="border-b border-(--color-line) py-6 pb-4 mb-4 max-[47.5rem]:py-4 max-[47.5rem]:pb-3">
          <h1 className="m-0 text-[clamp(2.75rem,11vw,4rem)] leading-none font-normal tracking-tight [&_code]:bg-transparent [&_code]:text-[length:inherit] [&_code]:text-inherit">
            <code><span className="title-cursor">lang</span>sagne</code>
          </h1>
          <p className="mt-2.5 text-sm leading-snug tracking-wide text-(--color-muted)">
            minimal programming language parser and execution experiment
          </p>
        </header>
        <main>{children}</main>
        <footer className="mt-8 border-t border-(--color-line) pt-4 text-sm leading-snug text-(--color-muted)">
          <a
            className="underline decoration-(--color-line) underline-offset-2 hover:text-(--color-fg)"
            href="https://github.com/huozhi/langsagne"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
          <span className="mx-2">.</span>
          <a
            className="underline decoration-(--color-line) underline-offset-2 hover:text-(--color-fg)"
            href="https://x.com/huozhi"
            target="_blank"
            rel="noreferrer"
          >
            huozhi
          </a>
        </footer>
      </div>
    </>
  )
}
