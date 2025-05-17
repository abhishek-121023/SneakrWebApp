"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { isMobile } from '@/lib/utils'
import Script from 'next/script'

interface ARShoeTrialProps {
  productId: string
  productName: string
  modelUrl: string
  isOpen: boolean
  onClose: () => void
}

export function ARShoeTrial({ productId, productName, modelUrl, isOpen, onClose }: ARShoeTrialProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [arSupported, setArSupported] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkARSupport = async () => {
      try {
        // Check if running on mobile
        if (!isMobile()) {
          setErrorMessage("AR view is only available on mobile devices")
          setArSupported(false)
          return
        }

        // Check if browser supports WebXR
        if (!navigator.xr) {
          setErrorMessage("Your browser doesn't support AR. Please try Chrome on Android or Safari on iOS")
          setArSupported(false)
          return
        }

        // Check if AR is supported
        const isSupported = await navigator.xr.isSessionSupported('immersive-ar')
        setArSupported(isSupported)
        if (!isSupported) {
          setErrorMessage("Your device doesn't support AR capabilities")
        }
      } catch (error) {
        console.error('Error checking AR support:', error)
        setErrorMessage("Unable to check AR support. Please ensure you're using a compatible browser")
        setArSupported(false)
      }
    }

    checkARSupport()
  }, [])

  useEffect(() => {
    if (!isOpen || !sceneRef.current || !arSupported) return

    const initAR = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          } 
        })
        setHasPermission(true)
        stream.getTracks().forEach(track => track.stop())

        // Initialize AR scene
        const { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight, DirectionalLight } = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const { ArToolkitSource, ArToolkitContext, ArMarkerControls } = await import('@ar-js-org/ar.js/three.js/build/ar.js')

        // Set up Three.js scene
        const scene = new Scene()
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        if (sceneRef.current) {
          sceneRef.current.appendChild(renderer.domElement)
        }

        // Add lights
        const ambientLight = new AmbientLight(0xffffff, 0.5)
        const directionalLight = new DirectionalLight(0xffffff, 0.8)
        scene.add(ambientLight)
        scene.add(directionalLight)

        // Initialize AR toolkit
        const arToolkitSource = new ArToolkitSource({
          sourceType: 'webcam',
          sourceWidth: window.innerWidth,
          sourceHeight: window.innerHeight,
        })

        const arToolkitContext = new ArToolkitContext({
          cameraParametersUrl: '/camera_para.dat',
          detectionMode: 'mono',
        })

        // Load 3D shoe model
        const loader = new GLTFLoader()
        loader.load(modelUrl, (gltf) => {
          const model = gltf.scene
          model.scale.set(0.1, 0.1, 0.1) // Adjust scale as needed
          scene.add(model)
          setIsLoading(false)
        })

        // Handle resize
        const handleResize = () => {
          arToolkitSource.onResizeElement()
          arToolkitSource.copyElementSizeTo(renderer.domElement)
          if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
          }
        }
        window.addEventListener('resize', handleResize)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)
          if (arToolkitSource.ready) {
            arToolkitContext.update(arToolkitSource.domElement)
            renderer.render(scene, camera)
          }
        }
        animate()

        return () => {
          window.removeEventListener('resize', handleResize)
          if (sceneRef.current) {
            sceneRef.current.removeChild(renderer.domElement)
          }
        }
      } catch (error) {
        console.error('Error initializing AR:', error)
        setHasPermission(false)
        setErrorMessage("Camera permission is required for AR experience")
      }
    }

    initAR()
  }, [isOpen, arSupported, modelUrl])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0">
        <DialogHeader className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm p-4">
          <DialogTitle>{productName} - AR Trial</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-full">
          {!arSupported && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center p-4">
                <p className="text-lg font-semibold mb-2">AR Not Available</p>
                <p className="text-muted-foreground">{errorMessage}</p>
                <p className="mt-4 text-sm">
                  Requirements:
                  <br />• Chrome on Android or Safari on iOS
                  <br />• Device with AR capabilities
                  <br />• Camera permission enabled
                </p>
                <Button onClick={onClose} className="mt-4">
                  Close
                </Button>
              </div>
            </div>
          )}

          {!hasPermission && arSupported && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center p-4">
                <p className="mb-4">Camera permission is required for AR experience.</p>
                <Button onClick={() => {
                  navigator.mediaDevices.getUserMedia({ video: true })
                    .then(() => setHasPermission(true))
                    .catch(() => setErrorMessage("Camera permission denied"))
                }}>
                  Grant Permission
                </Button>
              </div>
            </div>
          )}

          {isLoading && hasPermission && arSupported && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <p>Loading AR experience...</p>
            </div>
          )}

          <div ref={sceneRef} className="w-full h-full" />

          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4 z-50">
            <Button variant="secondary" onClick={onClose}>
              Close AR View
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 