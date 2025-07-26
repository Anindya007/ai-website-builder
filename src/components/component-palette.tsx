import { useDraggable } from "@dnd-kit/core"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ComponentType } from "@/types/components"
import { Crown, Lock } from "lucide-react"

const COMPONENTS: ComponentType[] = [
  // Free Components - Headers
  {
    id: "hero-basic",
    name: "Basic Hero",
    category: "Headers",
    isPro: false,
    preview: "Simple hero section with title and subtitle",
  },
  {
    id: "navbar-simple",
    name: "Simple Navbar",
    category: "Headers",
    isPro: false,
    preview: "Basic navigation bar with menu items",
  },
  {
    id: "header-with-cta",
    name: "Header with CTA",
    category: "Headers",
    isPro: false,
    preview: "Header section with call-to-action button",
  },

  // Free Components - Forms
  {
    id: "contact-form-basic",
    name: "Contact Form",
    category: "Forms",
    isPro: false,
    preview: "Basic contact form with name, email, and message",
  },
  {
    id: "newsletter-signup",
    name: "Newsletter Signup",
    category: "Forms",
    isPro: false,
    preview: "Email subscription form",
  },
  {
    id: "login-form",
    name: "Login Form",
    category: "Forms",
    isPro: false,
    preview: "User login form with email and password",
  },
  {
    id: "registration-form",
    name: "Registration Form",
    category: "Forms",
    isPro: false,
    preview: "User registration form with multiple fields",
  },
  {
    id: "search-bar",
    name: "Search Bar",
    category: "Forms",
    isPro: false,
    preview: "Search input with button",
  },
  {
    id: "survey-form",
    name: "Survey Form",
    category: "Forms",
    isPro: false,
    preview: "Multi-question survey form",
  },
  {
    id: "file-upload",
    name: "File Upload",
    category: "Forms",
    isPro: false,
    preview: "File upload component with drag and drop",
  },

  // Free Components - Buttons & CTAs
  {
    id: "button-primary",
    name: "Primary Button",
    category: "Buttons",
    isPro: false,
    preview: "Standard call-to-action button",
  },
  {
    id: "button-group",
    name: "Button Group",
    category: "Buttons",
    isPro: false,
    preview: "Group of related buttons",
  },
  {
    id: "cta-section",
    name: "CTA Section",
    category: "Buttons",
    isPro: false,
    preview: "Call-to-action section with text and button",
  },

  // Free Components - Content
  {
    id: "text-block",
    name: "Text Block",
    category: "Content",
    isPro: false,
    preview: "Basic text content block",
  },
  {
    id: "feature-list",
    name: "Feature List",
    category: "Content",
    isPro: false,
    preview: "List of features with icons",
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    category: "Content",
    isPro: false,
    preview: "Frequently asked questions with collapsible answers",
  },
  {
    id: "stats-section",
    name: "Stats Section",
    category: "Content",
    isPro: false,
    preview: "Statistics display with numbers and labels",
  },
  {
    id: "team-section",
    name: "Team Section",
    category: "Content",
    isPro: false,
    preview: "Team member cards with photos and info",
  },

  // Free Components - Media
  {
    id: "image-simple",
    name: "Simple Image",
    category: "Media",
    isPro: false,
    preview: "Basic image component",
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    category: "Media",
    isPro: false,
    preview: "Grid layout for multiple images",
  },
  {
    id: "video-embed",
    name: "Video Embed",
    category: "Media",
    isPro: false,
    preview: "Embedded video player",
  },

  // Free Components - Layout
  {
    id: "two-column",
    name: "Two Column Layout",
    category: "Layout",
    isPro: false,
    preview: "Two column content layout",
  },
  {
    id: "three-column",
    name: "Three Column Layout",
    category: "Layout",
    isPro: false,
    preview: "Three column content layout",
  },
  {
    id: "card-grid",
    name: "Card Grid",
    category: "Layout",
    isPro: false,
    preview: "Grid of content cards",
  },

  // Free Components - Footer
  {
    id: "footer",
    name: "Footer",
    category: "Footer",
    isPro: false,
    preview: "Website footer with links and social media",
  },

  // Pro Components
  {
    id: "hero-animated",
    name: "Animated Hero",
    category: "Headers",
    isPro: true,
    preview: "Hero with animations and video background",
  },
  {
    id: "pricing-table",
    name: "Pricing Table",
    category: "Commerce",
    isPro: true,
    preview: "Professional pricing comparison table",
  },
  {
    id: "testimonials-carousel",
    name: "Testimonials Carousel",
    category: "Social Proof",
    isPro: true,
    preview: "Rotating customer testimonials",
  },
  {
    id: "contact-form-advanced",
    name: "Advanced Contact Form",
    category: "Forms",
    isPro: true,
    preview: "Multi-step contact form with validation",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    category: "Data",
    isPro: true,
    preview: "Interactive charts and metrics",
  },
  {
    id: "ecommerce-product-grid",
    name: "Product Grid",
    category: "Commerce",
    isPro: true,
    preview: "Advanced product showcase grid",
  },
]

interface ComponentPaletteProps {
  isPro: boolean
}

export function ComponentPalette({ isPro }: ComponentPaletteProps) {
  const categories = [...new Set(COMPONENTS.map((comp) => comp.category))]

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-500 mt-1">Drag components to canvas</p>
      </div>

      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="p-4 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-3">{category}</h3>
              <div className="space-y-2">
                {COMPONENTS.filter((comp) => comp.category === category).map((component) => (
                  <DraggableComponent key={component.id} component={component} isPro={isPro} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface DraggableComponentProps {
  component: ComponentType
  isPro: boolean
}

function DraggableComponent({ component, isPro }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: { component },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const canDrag = !component.isPro || isPro

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(canDrag ? listeners : {})}
      {...(canDrag ? attributes : {})}
      className={`
        p-3 border border-gray-200 rounded-lg cursor-pointer transition-all
        ${isDragging ? "opacity-50" : ""}
        ${canDrag ? "hover:border-blue-300 hover:shadow-sm" : "opacity-60 cursor-not-allowed"}
        ${component.isPro ? "bg-gradient-to-br from-purple-50 to-blue-50" : "bg-white hover:bg-gray-50"}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="font-medium text-sm text-gray-900">{component.name}</div>
        {component.isPro && (
          <div className="flex items-center gap-1">
            {!isPro && <Lock className="w-3 h-3 text-gray-400" />}
            <Crown className="w-3 h-3 text-yellow-600" />
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500">{component.preview}</div>
      {component.isPro && (
        <Badge variant="secondary" className="mt-2 text-xs bg-yellow-100 text-yellow-800">
          Pro
        </Badge>
      )}
    </div>
  )
}
