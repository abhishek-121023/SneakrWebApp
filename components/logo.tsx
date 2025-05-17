import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "compact"
  withTagline?: boolean
  asLink?: boolean
}

export function Logo({ className, variant = "default", withTagline = false, asLink = true }: LogoProps) {
  const logoContent = (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        {variant === "default" ? (
          <div className="relative flex items-center">
            <div className="text-gradient font-heading text-3xl md:text-4xl tracking-wider flex items-center">
              <span>S</span>
              <span className="relative">
                <span>N</span>
                <svg
                  className="absolute -top-1 -right-1 w-3 h-3 text-primary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </span>
              <span className="relative">
                <span>E</span>
                <ShoeSilhouette className="absolute -top-3 -right-3 w-6 h-6 text-primary transform rotate-12" />
              </span>
              <span>A</span>
              <span>K</span>
              <span className="relative">
                <span>R</span>
                <svg
                  className="absolute -bottom-1 -right-1 w-3 h-3 text-primary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <span className="text-gradient font-heading text-2xl">S</span>
            <ShoeSilhouette className="absolute w-full h-full text-primary opacity-30" />
          </div>
        )}
      </div>
      {withTagline && <span className="text-xs text-muted-foreground mt-1 tracking-wider">PREMIUM SNEAKER STORE</span>}
    </div>
  )

  if (asLink) {
    return <Link href="/">{logoContent}</Link>
  }

  return logoContent
}

function ShoeSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 14c0-2.2.8-4.1 2.3-5.6C6.4 6.3 8.8 5 12 5c3.5 0 6.5 1.5 8 4" />
      <path d="M20 9c.9 0 1.3 0 1.6.3.3.2.4.6.4 1.4 0 .4 0 .8-.2 1.1-.2.4-.6.8-1.2 1.2-1.3.9-2.8 1.1-4.6 1.1H8.9c-1.3 0-2 0-2.6.3-.5.3-.9.7-1.1 1.2-.2.6-.2 1.3-.2 2.6 0 .9 0 1.3.3 1.6.2.3.6.4 1.4.4H19c.9 0 1.3 0 1.6-.3.3-.2.4-.6.4-1.4 0-.5 0-.8-.1-1.1" />
      <path d="M7 19v-3" />
      <path d="M11 19v-3" />
      <path d="M15 19v-3" />
      <path d="M19 19v-3" />
    </svg>
  )
}

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="text-gradient font-heading text-4xl md:text-5xl tracking-wider flex items-center">
        <span className="animate-fade-in" style={{ animationDelay: "0ms" }}>
          S
        </span>
        <span className="animate-fade-in relative" style={{ animationDelay: "100ms" }}>
          N
          <svg
            className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
        </span>
        <span className="animate-fade-in relative" style={{ animationDelay: "200ms" }}>
          E
          <ShoeSilhouette className="absolute -top-3 -right-3 w-6 h-6 text-primary transform rotate-12 animate-float" />
        </span>
        <span className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          A
        </span>
        <span className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          K
        </span>
        <span className="animate-fade-in relative" style={{ animationDelay: "500ms" }}>
          R
          <svg
            className="absolute -bottom-1 -right-1 w-3 h-3 text-primary animate-pulse"
            style={{ animationDelay: "300ms" }}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
        </span>
      </div>
      <div
        className="text-xs text-muted-foreground mt-1 tracking-wider text-center animate-fade-in"
        style={{ animationDelay: "600ms" }}
      >
        PREMIUM SNEAKER STORE
      </div>
    </div>
  )
}

export function ArtisticLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow"></div>
        <div className="relative z-10">
          <svg
            width="240"
            height="80"
            viewBox="0 0 240 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Background shoe silhouette */}
            <path
              d="M120 15C100 15 85 25 75 40C65 55 60 65 40 65H180C160 65 155 55 145 40C135 25 140 15 120 15Z"
              fill="url(#paint0_linear)"
              fillOpacity="0.2"
              className="animate-float"
            />

            {/* SNEAKR Text */}
            <path
              d="M30 50C30 40 35 35 45 35C55 35 55 40 55 45C55 50 50 55 40 55C30 55 30 50 30 50Z"
              fill="url(#paint1_linear)"
            />
            <path d="M60 35L70 55M70 35L60 55" stroke="url(#paint2_linear)" strokeWidth="5" strokeLinecap="round" />
            <path d="M80 35V55M80 45H95" stroke="url(#paint3_linear)" strokeWidth="5" strokeLinecap="round" />
            <path d="M105 35L115 55M115 35L105 55" stroke="url(#paint4_linear)" strokeWidth="5" strokeLinecap="round" />
            <path
              d="M125 35V55M125 35L140 45M125 45L140 35V55"
              stroke="url(#paint5_linear)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M150 35C150 35 150 35 160 35C170 35 170 45 160 45C170 45 175 55 165 55C155 55 150 55 150 55"
              stroke="url(#paint6_linear)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Shoe details */}
            <circle cx="45" cy="45" r="3" fill="white" />
            <circle cx="160" cy="45" r="3" fill="white" />
            <path
              d="M120 25C115 25 110 30 110 35C110 40 115 45 120 45C125 45 130 40 130 35C130 30 125 25 120 25Z"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="paint0_linear" x1="40" y1="15" x2="180" y2="65" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="30" y1="35" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="60" y1="35" x2="70" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint3_linear" x1="80" y1="35" x2="95" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint4_linear" x1="105" y1="35" x2="115" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint5_linear" x1="125" y1="35" x2="140" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="paint6_linear" x1="150" y1="35" x2="175" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
