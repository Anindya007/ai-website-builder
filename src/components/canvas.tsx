"use client"

import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import type { ComponentType } from "@/types/components"
import { Trash2, Edit } from "lucide-react"

interface CanvasProps {
  components: ComponentType[]
  onRemoveComponent: (canvasId: string) => void
}

export function Canvas({ components, onRemoveComponent }: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  })

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Canvas</h2>
        <p className="text-sm text-gray-500">Drop components here to build your website</p>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 p-6 overflow-auto
          ${isOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""}
        `}
      >
        {components.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
              <p className="text-gray-500 max-w-sm">Drag components from the sidebar to start building your website</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {components.map((component) => (
              <CanvasComponent
                key={component.canvasId}
                component={component}
                onRemove={() => onRemoveComponent(component.canvasId!)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface CanvasComponentProps {
  component: ComponentType
  onRemove: () => void
}

function CanvasComponent({ component, onRemove }: CanvasComponentProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
      {/* Component Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
          <Edit className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onRemove}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Component Preview */}
      <ComponentPreview component={component} />
    </div>
  )
}

function ComponentPreview({ component }: { component: ComponentType }) {
  switch (component.id.split("-")[0]) {
    case "hero":
      return (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {component.id.includes("animated") ? "🎬 Animated Hero Section" : "Welcome to Our Website"}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {component.id.includes("animated")
              ? "Dynamic hero with video background and animations"
              : "Build amazing websites with our drag-and-drop builder"}
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      )

    case "button":
      return (
        <div className="flex justify-center">
          <Button>Click Me</Button>
        </div>
      )

    case "text":
      return (
        <div className="prose max-w-none">
          <p>
            This is a text block component. You can add any content here including paragraphs, lists, and more
            formatting options.
          </p>
        </div>
      )

    case "image":
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>
      )

    case "footer":
      return (
        <footer className="bg-gray-900 text-white p-6 rounded-lg">
          <div className="text-center">
            <p>&copy; 2024 Your Website. All rights reserved.</p>
          </div>
        </footer>
      )

    case "pricing":
      return (
        <div className="grid grid-cols-3 gap-4">
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <div key={plan} className="border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold mb-2">{plan}</h3>
              <div className="text-2xl font-bold mb-4">${plan === "Basic" ? "9" : plan === "Pro" ? "29" : "99"}</div>
              <Button size="sm" className="w-full">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      )

    case "testimonials":
      return (
        <div className="text-center">
          <blockquote className="text-lg italic mb-4">
            "This website builder is amazing! It saved us so much time."
          </blockquote>
          <cite className="text-gray-600">- Happy Customer</cite>
        </div>
      )

    case "contact":
      return (
        <div className="max-w-md mx-auto space-y-4">
          <input className="w-full p-2 border border-gray-300 rounded" placeholder="Name" />
          <input className="w-full p-2 border border-gray-300 rounded" placeholder="Email" />
          <textarea className="w-full p-2 border border-gray-300 rounded h-24" placeholder="Message"></textarea>
          <Button className="w-full">Send Message</Button>
        </div>
      )

    case "analytics":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600">Visitors</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600">Conversion</div>
          </div>
        </div>
      )

    case "ecommerce":
      return (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-3">
              <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
              <div className="text-sm font-medium">Product {item}</div>
              <div className="text-lg font-bold text-green-600">$99</div>
            </div>
          ))}
        </div>
      )

    default:
      return <div className="text-center py-8 text-gray-500">Component Preview: {component.name}</div>
  }
}
