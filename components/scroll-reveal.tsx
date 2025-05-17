"use client"

import { useEffect, useLayoutEffect, useRef, ReactNode, useState } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Set client-side flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current
    if (!element || !isClient) return

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal-on-scroll')
          }, delay)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, isClient])

  // During SSR and initial hydration, render without animations
  if (!isClient) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  // After hydration, render with scroll reveal functionality
  return (
    <div ref={elementRef} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  )
} 