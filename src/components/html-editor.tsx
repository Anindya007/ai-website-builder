"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Eye } from "lucide-react"

interface HtmlEditorProps {
  value: string
  onChange: (value: string) => void
  componentName: string
}

export function HtmlEditor({ value, onChange, componentName }: HtmlEditorProps) {
  const [activeTab, setActiveTab] = useState("code")

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Editing</Badge>
          <span className="text-sm font-medium">{componentName}</span>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="code" className="text-xs px-2">
              <Code className="w-3 h-3 mr-1" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs px-2">
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="code" className="m-0">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm border-none resize-none focus:outline-none bg-gray-900 text-green-400"
            placeholder="Enter your HTML code here..."
            spellCheck={false}
          />
        </TabsContent>
        <TabsContent value="preview" className="m-0">
          <div className="p-4 h-64 overflow-auto bg-white" dangerouslySetInnerHTML={{ __html: value }} />
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          💡 Tip: Use standard HTML tags. Tailwind CSS classes are available for styling.
        </p>
      </div>
    </div>
  )
}
