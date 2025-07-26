"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import type { ComponentType } from "@/types/components"
import { Trash2, Edit, GripVertical } from "lucide-react"
import { useState } from "react"
import { getDefaultHtml } from "@/lib/default-html"

interface CanvasProps {
  components: ComponentType[]
  onRemoveComponent: (canvasId: string) => void
  editingComponent: string | null
  onToggleEdit: (canvasId: string) => void
  onUpdateHtml: (canvasId: string, htmlContent: string) => void
  isPreviewMode?: boolean
}

export function Canvas({ components, onRemoveComponent, editingComponent, onToggleEdit, onUpdateHtml, isPreviewMode = false }: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  })

  return (
    <div className={`flex-1 flex flex-col ${isPreviewMode ? 'bg-white' : 'bg-gray-100'} h-full overflow-hidden`}>
      {!isPreviewMode && (
        <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
          <h2 className="font-semibold text-gray-900">Canvas</h2>
          <p className="text-sm text-gray-500">Drop components here to build your website</p>
        </div>
      )}

      <div
        ref={setNodeRef}
        className={`
          flex-1 ${isPreviewMode ? 'p-0 bg-white' : 'p-6'} overflow-y-auto min-h-0
          ${isOver && !isPreviewMode ? "bg-blue-50" : ""}
          ${!isPreviewMode ? "min-h-[400px]" : ""}
          transition-colors duration-200
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
          <SortableContext items={components.map(c => c.canvasId!)} strategy={verticalListSortingStrategy}>
            <div className={isPreviewMode ? "space-y-0" : "space-y-4"}>
              {/* Drop zone indicator at the top when dragging */}
              {isOver && !isPreviewMode && (
                <div className="h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded-md opacity-75 transition-all" />
              )}
              
              {components.map((component, index) => (
                <div key={component.canvasId}>
                  <SortableCanvasComponent
                    isEditing={editingComponent === component.canvasId && !isPreviewMode}
                    component={component}
                    onRemove={() => onRemoveComponent(component.canvasId!)}
                    onToggleEdit={() => onToggleEdit(component.canvasId!)}
                    onUpdateHtml={(htmlContent) => onUpdateHtml(component.canvasId!, htmlContent)}
                    isPreviewMode={isPreviewMode}
                  />
                  
                  {/* Drop zone indicator between components when dragging */}
                  {isOver && !isPreviewMode && index < components.length - 1 && (
                    <div className="h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded-md opacity-75 transition-all my-2" />
                  )}
                </div>
              ))}
              
              {/* Drop zone indicator at the bottom when dragging */}
              {isOver && !isPreviewMode && (
                <div className="h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded-md opacity-75 transition-all" />
              )}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}

interface CanvasComponentProps {
  component: ComponentType
  isEditing: boolean
  onRemove: () => void
  onToggleEdit: () => void
  onUpdateHtml: (htmlContent: string) => void
  isPreviewMode?: boolean
}

interface SortableCanvasComponentProps extends CanvasComponentProps {}

function SortableCanvasComponent(props: SortableCanvasComponentProps) {
  const { component, isPreviewMode = false } = props
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id: component.canvasId!,
    disabled: isPreviewMode || props.isEditing
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        ${isDragging ? "opacity-50 z-50" : ""} 
        ${isOver && !isDragging && !isPreviewMode ? "ring-2 ring-blue-400 ring-opacity-50" : ""}
        transition-all duration-200
      `}
    >
      <CanvasComponent {...props} dragHandleProps={{ attributes, listeners }} />
    </div>
  )
}

function CanvasComponent({ component, isEditing, onRemove, onToggleEdit, onUpdateHtml, isPreviewMode = false, dragHandleProps }: CanvasComponentProps & { dragHandleProps?: any }) {
  const [htmlContent, setHtmlContent] = useState(component.htmlContent || getDefaultHtml(component))

  const handleSave = () => {
    onUpdateHtml(htmlContent)
    onToggleEdit()
  }

  const handleCancel = () => {
    setHtmlContent(component.htmlContent || getDefaultHtml(component))
    onToggleEdit()
  }

   return (
    <div className={`group relative ${isPreviewMode ? '' : 'bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors'}`}>
      {/* Component Actions - Hidden in preview mode */}
      {!isPreviewMode && (
        <>
          {/* Drag Handle */}
          {!isEditing && (
            <div 
              className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              {...dragHandleProps?.attributes}
              {...dragHandleProps?.listeners}
            >
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50"
                title="Drag to reorder"
              >
                <GripVertical className="w-3 h-3 text-gray-500" />
              </Button>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" className="h-8 px-2 bg-white" onClick={handleSave}>
                  Save
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-2 bg-white" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white" onClick={onToggleEdit}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white" onClick={onRemove}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        </>
      )}

      {/* Component Content */}
      {isEditing ? (
        <Editor value={htmlContent} onChange={setHtmlContent} componentName={component.name} />
      ) : (
        <div 
          className={isPreviewMode ? "" : "p-6"} 
          dangerouslySetInnerHTML={{ __html: component.htmlContent || getDefaultHtml(component) }} 
        />
      )}
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

function Editor({
  value,
  onChange,
  componentName,
}: { value: string; onChange: (value: string) => void; componentName: string }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-medium">Editing: {componentName}</span>
      </div>
      <textarea
        className="w-full h-48 p-4 font-mono text-sm border-none resize-none focus:outline-none bg-gray-900 text-green-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter HTML for ${componentName}...`}
        spellCheck={false}
      />
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          💡 Tip: Use standard HTML tags. Tailwind CSS classes are available for styling.
        </p>
      </div>
    </div>
  )
}
