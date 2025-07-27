"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, X } from "lucide-react"

interface ProUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function ProUpgradeModal({ isOpen, onClose, onUpgrade }: ProUpgradeModalProps) {
  const proFeatures = [
    "HTML code editing",
    "Export options",
    "Advanced animated components",
    "E-commerce components",
    "Analytics dashboard widgets",
    "Advanced form components",
    "SEO-friendly meta tags and descriptions",
    "Priority support",
    "Custom branding removal"
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-600" />
            Upgrade to Pro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">$29/month</div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Most Popular
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Pro Features:</h3>
            <ul className="space-y-2">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={onUpgrade} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">30-day money-back guarantee</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
