"use client"

import { useState } from "react"
import { PricingTable, SignUpButton } from "@clerk/nextjs"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, DragOverEvent, closestCenter, pointerWithin, rectIntersection } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { ComponentPalette } from "@/components/component-palette"
import { Canvas } from "@/components/canvas"
import { Header } from "@/components/header"
import { ProUpgradeModal } from "@/components/pro-upgrade-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ComponentType } from "@/types/components"
import { generateCompleteHtml, downloadHtml } from "@/lib/html-generator"

export default function WebsiteBuilder() {
  const [canvasComponents, setCanvasComponents] = useState<ComponentType[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedComponent, setDraggedComponent] = useState<ComponentType | null>(null)
  const [showProModal, setShowProModal] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [editingMode, setEditingMode] = useState<'html' | 'text' | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleDragStart = (event: DragStartEvent) => {
    // Disable drag in preview mode
    if (isPreviewMode) return
    
    const { active } = event
    setActiveId(active.id as string)

    // Find the component being dragged
    const component = active.data.current?.component as ComponentType
    setDraggedComponent(component)
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Disable drag in preview mode
    if (isPreviewMode) return
    
    const { active, over } = event
    
    // This helps with drop zone detection when canvas has content
    if (over && (over.id === "canvas" || canvasComponents.find(c => c.canvasId === over.id))) {
      // Allow dropping
      return
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // Disable drag in preview mode
    if (isPreviewMode) return
    
    const { active, over } = event

    if (over) {
      // Handle reordering within canvas
      if (over.id !== "canvas" && canvasComponents.find(c => c.canvasId === active.id)) {
        const oldIndex = canvasComponents.findIndex(c => c.canvasId === active.id)
        const newIndex = canvasComponents.findIndex(c => c.canvasId === over.id)
        
        if (oldIndex !== newIndex) {
          setCanvasComponents((prev) => arrayMove(prev, oldIndex, newIndex))
        }
      }
      // Handle adding new component to canvas or inserting at specific position
      else if (over.id === "canvas" || canvasComponents.find(c => c.canvasId === over.id)) {
        const component = active.data.current?.component as ComponentType

        // Only proceed if this is a new component from palette (not reordering)
        if (component && !canvasComponents.find(c => c.canvasId === active.id)) {
          // Check if it's a pro component and user doesn't have pro
          if (component.isPro && !isPro) {
            setShowProModal(true)
            setActiveId(null)
            setDraggedComponent(null)
            return
          }

          // Add component to canvas
          const newComponent = {
            ...component,
            id: `${component.id}-${Date.now()}`,
            canvasId: `canvas-${Date.now()}`,
            width: 100, // Default to full width
          }

          // If dropping on a specific component, insert after it
          if (over.id !== "canvas") {
            const targetIndex = canvasComponents.findIndex(c => c.canvasId === over.id)
            if (targetIndex !== -1) {
              setCanvasComponents((prev) => {
                const newComponents = [...prev]
                newComponents.splice(targetIndex + 1, 0, newComponent)
                return newComponents
              })
            } else {
              setCanvasComponents((prev) => [...prev, newComponent])
            }
          } else {
            // Drop at the end if dropped on canvas
            setCanvasComponents((prev) => [...prev, newComponent])
          }
        }
      }
    }

    setActiveId(null)
    setDraggedComponent(null)
  }

  const removeComponent = (canvasId: string) => {
    setCanvasComponents((prev) => prev.filter((comp) => comp.canvasId !== canvasId))
  }

  
  const updateComponentHtml = (canvasId: string, htmlContent: string) => {
    setCanvasComponents((prev) => prev.map((comp) => (comp.canvasId === canvasId ? { ...comp, htmlContent } : comp)))
  }

  const updateComponent = (canvasId: string, updates: Partial<ComponentType>) => {
    setCanvasComponents((prev) => prev.map((comp) => (comp.canvasId === canvasId ? { ...comp, ...updates } : comp)))
  }

  const toggleEditMode = (canvasId: string, mode: 'html' | 'text' = 'html') => {
    if (editingComponent === canvasId && editingMode === mode) {
      setEditingComponent(null)
      setEditingMode(null)
    } else {
      setEditingComponent(canvasId)
      setEditingMode(mode)
    }
  }


  const upgradeToPro = () => {
    setShowProModal(false)
    // Redirect to Clerk's sign-up page with the pro plan preselected
    window.location.href = "/sign-up?priceId=price_pro"
  }

  const handleDownload = () => {
    downloadHtml(generateCompleteHtml(canvasComponents), 'my-website.html')
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    // Exit edit mode when entering preview mode
    if (!isPreviewMode) {
      setEditingComponent(null)
      setEditingMode(null)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header 
        isPro={isPro} 
        onUpgrade={() => setShowProModal(true)} 
        onExport={handleDownload}
        onPreview={togglePreviewMode}
        isPreviewMode={isPreviewMode}
      />

      <div className="flex-1 flex overflow-hidden">
        <DndContext 
          onDragStart={handleDragStart} 
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
        >
          {!isPreviewMode && <ComponentPalette isPro={isPro} />}
           <Canvas
            components={canvasComponents}
            onRemoveComponent={removeComponent}
            editingComponent={editingComponent}
            editingMode={editingMode}
            onToggleEdit={toggleEditMode}
            onUpdateHtml={updateComponentHtml}
            onUpdateComponent={updateComponent}
            isPreviewMode={isPreviewMode}
            isPro={isPro}
            onShowProModal={() => setShowProModal(true)}
          />

          <DragOverlay>
            {draggedComponent && (
              <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90">
                <div className="text-sm font-medium">{draggedComponent.name}</div>
                <div className="text-xs text-gray-500">{draggedComponent.category}</div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} onUpgrade={upgradeToPro} /> */}

      <Dialog open={showProModal} onOpenChange={setShowProModal}>
        <DialogContent className="sm:max-w-[600px] opacity-100">
          <DialogHeader>
            <DialogTitle>Pricing Plans</DialogTitle>
            <DialogDescription>
              Choose the plan that works best for you
            </DialogDescription>
          </DialogHeader>
          <PricingTable/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
