"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import type { ComponentType } from "@/types/components"
import { Trash2, Edit, GripVertical, Move, RotateCcw, Code, Type } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react"
import { getDefaultHtml } from "@/lib/default-html"

interface CanvasProps {
  components: ComponentType[]
  onRemoveComponent: (canvasId: string) => void
  editingComponent: string | null
  editingMode: 'html' | 'text' | null
  onToggleEdit: (canvasId: string, mode?: 'html' | 'text') => void
  onUpdateHtml: (canvasId: string, htmlContent: string) => void
  onUpdateComponent: (canvasId: string, updates: Partial<ComponentType>) => void
  isPreviewMode?: boolean
  isPro?: boolean
  onShowProModal?: () => void
}

export function Canvas({ components, onRemoveComponent, editingComponent, editingMode, onToggleEdit, onUpdateHtml, onUpdateComponent, isPreviewMode = false, isPro = false, onShowProModal }: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  })
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll to bottom when new components are added
  useEffect(() => {
    if (components.length > 0 && scrollContainerRef.current && !isPreviewMode) {
      // Small delay to ensure the new component is rendered
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [components.length, isPreviewMode])

  return (
    <div className={`flex-1 flex flex-col ${isPreviewMode ? 'bg-white' : 'bg-gray-100'} h-full overflow-hidden`}>
      {!isPreviewMode && (
        <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Canvas</h2>
              <p className="text-sm text-gray-500">Drop components here to build your website</p>
            </div>
            {components.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Layout:</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2 text-xs"
                  onClick={() => {
                    // Reset all components to full width (stacked layout)
                    components.forEach(comp => {
                      if (comp.canvasId) {
                        onUpdateComponent(comp.canvasId, { width: 100 })
                      }
                    })
                  }}
                >
                  Stack
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2 text-xs"
                  onClick={() => {
                    // Set all components to 33% width (three columns)
                    components.forEach(comp => {
                      if (comp.canvasId) {
                        onUpdateComponent(comp.canvasId, { width: 33 })
                      }
                    })
                  }}
                >
                  Columns
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        ref={(node) => {
          setNodeRef(node)
          scrollContainerRef.current = node
        }}
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
            <div className={`flex flex-wrap gap-4 ${isPreviewMode ? "gap-0" : ""} items-start`}>
              {/* Drop zone indicator when dragging */}
              {isOver && !isPreviewMode && (
                <div className="w-full h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded-md opacity-75 transition-all" />
              )}
              
              {components.map((component, index) => (
                <div 
                  key={component.canvasId}
                  className={`${isPreviewMode ? "w-full" : ""}`}
                  style={{
                    width: isPreviewMode ? '100%' : `${component.width || 100}%`,
                    minWidth: isPreviewMode ? 'auto' : '200px',
                    flexShrink: 0
                  }}
                >
                  <SortableCanvasComponent
                    isEditing={editingComponent === component.canvasId && !isPreviewMode}
                    editingMode={editingMode}
                    component={component}
                    onRemove={() => onRemoveComponent(component.canvasId!)}
                    onToggleEdit={onToggleEdit}
                    onUpdateHtml={(htmlContent) => onUpdateHtml(component.canvasId!, htmlContent)}
                    onUpdateComponent={(updates) => onUpdateComponent(component.canvasId!, updates)}
                    isPreviewMode={isPreviewMode}
                    isPro={isPro}
                    onShowProModal={onShowProModal}
                  />
                </div>
              ))}
              
              {/* Drop zone indicator at the bottom when dragging */}
              {isOver && !isPreviewMode && (
                <div className="w-full h-2 bg-blue-200 border-2 border-dashed border-blue-400 rounded-md opacity-75 transition-all" />
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
  editingMode: 'html' | 'text' | null
  onRemove: () => void
  onToggleEdit: (canvasId: string, mode?: 'html' | 'text') => void
  onUpdateHtml: (htmlContent: string) => void
  onUpdateComponent: (updates: Partial<ComponentType>) => void
  isPreviewMode?: boolean
  isPro?: boolean
  onShowProModal?: () => void
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

function CanvasComponent({ component, isEditing, editingMode, onRemove, onToggleEdit, onUpdateHtml, onUpdateComponent, isPreviewMode = false, isPro = false, onShowProModal, dragHandleProps }: CanvasComponentProps & { dragHandleProps?: any }) {
  const [htmlContent, setHtmlContent] = useState(component.htmlContent || getDefaultHtml(component))
  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Initialize textContent with extracted content from component HTML
  const [textContent, setTextContent] = useState(() => {
    if (typeof document === 'undefined') return ''
    const tempDiv = document.createElement('div')
    const html = component.htmlContent || getDefaultHtml(component)
    tempDiv.innerHTML = html
    
    // For WYSIWYG, we want to preserve some basic formatting
    // Look for the main content area and extract its innerHTML
    const contentElements = tempDiv.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6, ul, ol, li')
    
    if (contentElements.length > 0) {
      // Find the element with the most text content
      let mainElement = contentElements[0]
      let maxTextLength = 0
      
      contentElements.forEach(el => {
        const textLength = (el.textContent || '').trim().length
        if (textLength > maxTextLength) {
          maxTextLength = textLength
          mainElement = el
        }
      })
      
      // Return the innerHTML of the main content element for WYSIWYG editing
      return mainElement.innerHTML || mainElement.textContent || ''
    }
    
    // Fallback to plain text
    return tempDiv.textContent || tempDiv.innerText || ''
  })

  // Extract content for WYSIWYG editing when switching to text editing mode
  useEffect(() => {
    if (isEditing && editingMode === 'text') {
      const extractedContent = extractContentForWysiwyg(component.htmlContent || getDefaultHtml(component))
      setTextContent(extractedContent)
    }
  }, [isEditing, editingMode, component.htmlContent, component])

  // Utility function to extract content for WYSIWYG editing
  const extractContentForWysiwyg = (html: string): string => {
    if (typeof document === 'undefined') return ''
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // For WYSIWYG, we want to preserve some basic formatting
    // Look for the main content area and extract its innerHTML
    const contentElements = tempDiv.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6, ul, ol, li')
    
    if (contentElements.length > 0) {
      // Find the element with the most text content
      let mainElement = contentElements[0]
      let maxTextLength = 0
      
      contentElements.forEach(el => {
        const textLength = (el.textContent || '').trim().length
        if (textLength > maxTextLength) {
          maxTextLength = textLength
          mainElement = el
        }
      })
      
      // Return the innerHTML of the main content element for WYSIWYG editing
      return mainElement.innerHTML || mainElement.textContent || ''
    }
    
    // Fallback to plain text
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  // Utility function to replace content in HTML while preserving structure
  const replaceContentInHtml = (html: string, newContent: string): string => {
    if (typeof document === 'undefined') return html
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // Find the main content container
    const contentElements = tempDiv.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6, ul, ol')
    
    if (contentElements.length > 0) {
      // Find the element with the most text content (likely the main content)
      let mainElement = contentElements[0]
      let maxTextLength = 0
      
      contentElements.forEach(el => {
        const textLength = (el.textContent || '').trim().length
        if (textLength > maxTextLength) {
          maxTextLength = textLength
          mainElement = el
        }
      })
      
      // Replace the content of the main element
      // Since we're now working with WYSIWYG HTML content, always use innerHTML
      mainElement.innerHTML = newContent
    } else {
      // If no suitable container found, wrap in a paragraph
      tempDiv.innerHTML = `<p>${newContent}</p>`
    }
    
    return tempDiv.innerHTML
  }

  const handleSave = () => {
    if (editingMode === 'html') {
      onUpdateHtml(htmlContent)
    } else if (editingMode === 'text') {
      // For WYSIWYG, textContent now contains HTML, so we use it directly to replace content
      const updatedHtml = replaceContentInHtml(component.htmlContent || getDefaultHtml(component), textContent)
      onUpdateHtml(updatedHtml)
    }
    onToggleEdit(component.canvasId!, editingMode!)
  }

  const handleCancel = () => {
    setHtmlContent(component.htmlContent || getDefaultHtml(component))
    if (editingMode === 'text') {
      const extractedContent = extractContentForWysiwyg(component.htmlContent || getDefaultHtml(component))
      setTextContent(extractedContent)
    }
    onToggleEdit(component.canvasId!, editingMode!)
  }

  const handleWidthChange = (newWidth: number) => {
    onUpdateComponent({ width: Math.max(20, Math.min(100, newWidth)) })
  }

  const handleHeightChange = (newHeight: number, skipContentCheck = false) => {
    if (skipContentCheck) {
      // Direct update without recalculating content height (used during resize)
      // Still enforce a reasonable minimum height to prevent components from disappearing
      onUpdateComponent({ height: Math.max(50, newHeight) })
    } else {
      // Get the content height (scrollHeight) to prevent shrinking below content
      const contentElement = resizeRef.current?.querySelector('[dangerouslySetInnerHTML]') as HTMLElement
      const actualContentHeight = contentElement?.scrollHeight || resizeRef.current?.scrollHeight || 100
      // Use a more flexible minimum height that allows for better shrinking
      const minHeight = Math.max(50, Math.min(actualContentHeight - 48, actualContentHeight * 0.8))
      onUpdateComponent({ height: Math.max(minHeight, newHeight) })
    }
  }

  const handleResetSize = () => {
    onUpdateComponent({ width: 100, height: undefined })
  }

  const startResize = useCallback((e: React.MouseEvent, direction: 'right' | 'left' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') => {
    if (isPreviewMode || isEditing) return
    
    e.preventDefault()
    setIsResizing(true)
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = component.width || 100
    const startHeight = component.height || resizeRef.current?.offsetHeight || 200
    const containerWidth = resizeRef.current?.parentElement?.offsetWidth || 1000
    
    // Calculate content height constraint once at the start
    // Use a more reasonable minimum height calculation
    const contentElement = resizeRef.current?.querySelector('[dangerouslySetInnerHTML]') as HTMLElement
    const actualContentHeight = contentElement?.scrollHeight || resizeRef.current?.scrollHeight || 100
    // Reduce the minimum height to allow more flexibility, accounting for padding
    const minHeight = Math.max(50, Math.min(actualContentHeight - 48, actualContentHeight * 0.8))
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      
      let newWidth = startWidth
      let newHeight = startHeight
      
      // Handle horizontal resizing
      if (direction.includes('right')) {
        const deltaPercent = (deltaX / containerWidth) * 100
        newWidth = startWidth + deltaPercent
      } else if (direction.includes('left')) {
        const deltaPercent = (-deltaX / containerWidth) * 100
        newWidth = startWidth + deltaPercent
      }
      
      // Handle vertical resizing
      if (direction.includes('top')) {
        newHeight = startHeight - deltaY
      } else if (direction.includes('bottom')) {
        newHeight = startHeight + deltaY
      }
      
      // Apply changes
      if (direction.includes('right') || direction.includes('left')) {
        handleWidthChange(newWidth)
      }
      if (direction.includes('top') || direction.includes('bottom')) {
        // Ensure we don't resize below content height using pre-calculated minHeight
        const constrainedHeight = Math.max(minHeight, newHeight)
        // Use skipContentCheck to avoid recalculating minHeight during resize
        handleHeightChange(constrainedHeight, true)
      }
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
    
    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }, [component.width, component.height, isPreviewMode, isEditing, onUpdateComponent])

   return (
    <div 
      ref={resizeRef}
      className={`group relative ${isPreviewMode ? '' : 'bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors'} ${isResizing ? 'select-none border-blue-500 shadow-lg' : ''}`}
      style={{
        height: component.height ? `${component.height}px` : 'auto',
        minHeight: isPreviewMode ? 'auto' : '50px'
      }}
    >
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 bg-white" 
                  onClick={() => {
                    if (!isPro && onShowProModal) {
                      onShowProModal()
                    } else {
                      onToggleEdit(component.canvasId!, 'html')
                    }
                  }}
                  title={isPro ? "Edit HTML" : "Edit HTML (Pro Feature)"}
                >
                  <Code className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 bg-white" 
                  onClick={() => onToggleEdit(component.canvasId!, 'text')}
                  title="Edit Text"
                >
                  <Type className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 bg-white" 
                  onClick={handleResetSize}
                  title="Reset Size"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white" onClick={onRemove}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>

          {/* Resize Handles */}
          {!isEditing && (
            <>
              {/* Right edge */}
              <div
                className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-10 flex items-center justify-center bg-gradient-to-l from-blue-500/10 to-transparent"
                onMouseDown={(e) => startResize(e, 'right')}
                title="Drag to resize width"
              >
                <div className="w-1 h-8 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              {/* Left edge */}
              <div
                className="absolute top-0 left-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-10 flex items-center justify-center bg-gradient-to-r from-blue-500/10 to-transparent"
                onMouseDown={(e) => startResize(e, 'left')}
                title="Drag to resize width"
              >
                <div className="w-1 h-8 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              {/* Top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-10 flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent"
                onMouseDown={(e) => startResize(e, 'top')}
                title="Drag to resize height"
              >
                <div className="h-1 w-8 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              {/* Bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-10 flex items-center justify-center bg-gradient-to-t from-blue-500/10 to-transparent"
                onMouseDown={(e) => startResize(e, 'bottom')}
                title="Drag to resize height"
              >
                <div className="h-1 w-8 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              {/* Corner handles */}
              <div
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-20"
                onMouseDown={(e) => startResize(e, 'top-right')}
                title="Drag to resize"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              <div
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-20"
                onMouseDown={(e) => startResize(e, 'top-left')}
                title="Drag to resize"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              <div
                className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-20"
                onMouseDown={(e) => startResize(e, 'bottom-right')}
                title="Drag to resize"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>

              <div
                className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-20"
                onMouseDown={(e) => startResize(e, 'bottom-left')}
                title="Drag to resize"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors"></div>
              </div>
            </>
          )}
        </>
      )}

      {/* Component Content */}
      {isEditing ? (
        editingMode === 'html' ? (
          <HtmlEditor value={htmlContent} onChange={setHtmlContent} componentName={component.name} />
        ) : (
          <TextEditor value={textContent} onChange={setTextContent} componentName={component.name} />
        )
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

function HtmlEditor({
  value,
  onChange,
  componentName,
}: { value: string; onChange: (value: string) => void; componentName: string }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
        <Code className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium">HTML Editor: {componentName}</span>
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

function TextEditor({
  value,
  onChange,
  componentName,
}: { value: string; onChange: (value: string) => void; componentName: string }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize editor content only once when component mounts
  useEffect(() => {
    if (editorRef.current && !isInitialized && value !== undefined) {
      // Convert plain text to simple HTML for WYSIWYG display
      const isPlainText = !value.includes('<')
      if (isPlainText) {
        // Convert line breaks to paragraphs for better WYSIWYG experience
        const paragraphs = value.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('')
        editorRef.current.innerHTML = paragraphs || '<p><br></p>'
      } else {
        // If it's already HTML, just set it directly
        editorRef.current.innerHTML = value || '<p><br></p>'
      }
      setIsInitialized(true)
    }
  }, [value, isInitialized])

  const handleInput = () => {
    if (editorRef.current) {
      // Pass the HTML content to maintain formatting
      const htmlContent = editorRef.current.innerHTML
      onChange(htmlContent)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle basic shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          e.preventDefault()
          executeCommand('undo')
          break
        case 'y':
          e.preventDefault()
          executeCommand('redo')
          break
      }
    }
    
    // Handle Enter key to create new paragraphs
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      executeCommand('insertParagraph')
    }
  }

  // Save and restore cursor position
  const saveCursorPosition = () => {
    if (typeof window === 'undefined') return null
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0)
    }
    return null
  }

  const restoreCursorPosition = (range: Range | null) => {
    if (range && typeof window !== 'undefined') {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const executeCommand = (command: string) => {
    const range = saveCursorPosition()
    if (typeof document !== 'undefined') {
      document.execCommand(command, false)
    }
    handleInput()
    
    // Small delay to ensure DOM is updated before restoring cursor
    setTimeout(() => {
      editorRef.current?.focus()
      if (range) {
        restoreCursorPosition(range)
      }
    }, 0)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-blue-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">WYSIWYG Editor: {componentName}</span>
        </div>                
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        className="w-full p-4 text-sm border-none focus:outline-none bg-white text-gray-900 leading-relaxed wysiwyg-editor"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{ 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '192px'
        }}
        suppressContentEditableWarning={true}
      />
      
      <div className="bg-blue-50 px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-blue-700">
          ✨ WYSIWYG Editor: See your changes as you type. Use Ctrl+Z/Y for undo/redo, or use the toolbar buttons for lists.
        </p>
      </div>
      
      {/* Inline styles for placeholder and editor styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .wysiwyg-editor:empty:before {
            content: 'Start typing to edit ${componentName}...';
            color: #9CA3AF;
            font-style: italic;
            pointer-events: none;
          }
          .wysiwyg-editor p {
            margin: 0.5em 0;
          }
          .wysiwyg-editor p:first-child {
            margin-top: 0;
          }
          .wysiwyg-editor p:last-child {
            margin-bottom: 0;
          }
          .wysiwyg-editor ul, .wysiwyg-editor ol {
            margin: 0.5em 0;
            padding-left: 1.5em;
          }
          .wysiwyg-editor li {
            margin: 0.25em 0;
          }
        `
      }} />
    </div>
  )
}
