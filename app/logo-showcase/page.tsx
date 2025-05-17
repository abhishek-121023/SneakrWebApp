import { Logo, AnimatedLogo, ArtisticLogo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"

export default function LogoShowcasePage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-heading text-3xl mb-8 text-center">SNEAKR Logo Showcase</h1>

      <div className="grid gap-16">
        {/* Standard Logo */}
        <section>
          <h2 className="font-heading text-2xl mb-4">Standard Logo</h2>
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-background rounded-lg">
              <Logo />
              <p className="text-muted-foreground text-sm">Default Logo</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-background rounded-lg">
              <Logo withTagline />
              <p className="text-muted-foreground text-sm">Logo with Tagline</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-background rounded-lg">
              <Logo variant="compact" />
              <p className="text-muted-foreground text-sm">Compact Logo</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-secondary rounded-lg">
              <Logo />
              <p className="text-muted-foreground text-sm">Logo on Secondary Background</p>
            </div>
          </div>
        </section>

        {/* Animated Logo */}
        <section>
          <h2 className="font-heading text-2xl mb-4">Animated Logo</h2>
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-background rounded-lg">
              <AnimatedLogo />
              <p className="text-muted-foreground text-sm">Animated Logo with Fade-in Effect</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-secondary rounded-lg">
              <AnimatedLogo />
              <p className="text-muted-foreground text-sm">Animated Logo on Secondary Background</p>
            </div>
          </div>
        </section>

        {/* Artistic Logo */}
        <section>
          <h2 className="font-heading text-2xl mb-4">Artistic Logo</h2>
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col items-center justify-center space-y-4 p-12 bg-background rounded-lg">
              <ArtisticLogo className="w-full max-w-xl" />
              <p className="text-muted-foreground text-sm">Artistic Logo with Shoe Silhouette</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-12 bg-secondary rounded-lg">
              <ArtisticLogo className="w-full max-w-xl" />
              <p className="text-muted-foreground text-sm">Artistic Logo on Secondary Background</p>
            </div>
          </div>
        </section>

        {/* Logo Usage Guidelines */}
        <section>
          <h2 className="font-heading text-2xl mb-4">Logo Usage Guidelines</h2>
          <Separator className="mb-8" />
          <div className="prose max-w-none">
            <p>
              The SNEAKR logo represents our brand identity and should be used consistently across all platforms and
              materials. Here are some guidelines for using our logo:
            </p>
            <ul>
              <li>
                <strong>Clear Space:</strong> Always maintain adequate clear space around the logo to ensure visibility
                and impact.
              </li>
              <li>
                <strong>Sizing:</strong> Never display the logo at sizes where the details become illegible.
              </li>
              <li>
                <strong>Color:</strong> Use the logo in its original colors. When placed on dark backgrounds, use the
                light version.
              </li>
              <li>
                <strong>Modifications:</strong> Do not stretch, distort, or alter the logo in any way that compromises
                its integrity.
              </li>
              <li>
                <strong>Placement:</strong> Position the logo prominently in layouts, ensuring it's not crowded by other
                elements.
              </li>
            </ul>
            <p>
              For different use cases, choose the appropriate logo variant:
              <br />- Standard Logo: For most applications
              <br />- Compact Logo: For small spaces or favicon
              <br />- Animated Logo: For digital platforms and loading screens
              <br />- Artistic Logo: For special promotions and artistic contexts
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
