"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Download, Save, Eye } from "lucide-react"

interface HeaderProps {
  isPro: boolean
  onUpgrade: () => void
}

export function Header({ isPro, onUpgrade }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">WebBuilder</h1>
          {isPro && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          {!isPro && (
            <Button onClick={onUpgrade} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
