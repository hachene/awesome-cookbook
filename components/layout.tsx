import { ReactNode } from "react"
import styles from "./layout.module.css"

export function Layout({ children }: LayoutProps) {
  return <div className={styles.container}>{children}</div>
}

type LayoutProps = { children: ReactNode }
