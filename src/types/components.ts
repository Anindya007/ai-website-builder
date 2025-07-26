export interface ComponentType {
  id: string
  name: string
  category: string
  isPro: boolean
  preview: string
  canvasId?: string
  htmlContent?: string
  isEditing?: boolean
  width?: number // Width as percentage (1-100)
  height?: number // Height in pixels (optional)
}
