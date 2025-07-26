"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, DragOverEvent, closestCenter } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { ComponentPalette } from "@/components/component-palette"
import { Canvas } from "@/components/canvas"
import { Header } from "@/components/header"
import { ProUpgradeModal } from "@/components/pro-upgrade-modal"
import type { ComponentType } from "@/types/components"
import { generateCompleteHtml, downloadHtml } from "@/lib/html-generator"

export default function WebsiteBuilder() {
  const [canvasComponents, setCanvasComponents] = useState<ComponentType[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedComponent, setDraggedComponent] = useState<ComponentType | null>(null)
  const [showProModal, setShowProModal] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
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
      // Handle adding new component to canvas
      else if (over.id === "canvas") {
        const component = active.data.current?.component as ComponentType

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
        }

        setCanvasComponents((prev) => [...prev, newComponent])
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

  const toggleEditMode = (canvasId: string) => {
    setEditingComponent(editingComponent === canvasId ? null : canvasId)
  }


  const upgradeToPro = () => {
    setIsPro(true)
    setShowProModal(false)
  }

  const handleDownload = () => {
    downloadHtml(generateCompleteHtml(canvasComponents), 'my-website.html')
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    // Exit edit mode when entering preview mode
    if (!isPreviewMode) {
      setEditingComponent(null)
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
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          {!isPreviewMode && <ComponentPalette isPro={isPro} />}
           <Canvas
            components={canvasComponents}
            onRemoveComponent={removeComponent}
            editingComponent={editingComponent}
            onToggleEdit={toggleEditMode}
            onUpdateHtml={updateComponentHtml}
            isPreviewMode={isPreviewMode}
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

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} onUpgrade={upgradeToPro} />
    </div>
  )
}
