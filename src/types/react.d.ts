import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.HTMLAttributes<HTMLElement>;
    }
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: string]: string | number | undefined;
  }
} 