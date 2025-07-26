import type { ComponentType } from "@/types/components"
import { getDefaultHtml } from "./default-html"

export function generateCompleteHtml(components: ComponentType[]): string {
  // Combine all component HTML content
  const componentHtml = components
    .map(component => component.htmlContent || getDefaultHtml(component))
    .join('\n\n')

  // Generate complete HTML document with Tailwind CSS
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for better presentation */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        /* Ensure proper spacing between components */
        .component-wrapper {
            margin-bottom: 2rem;
        }
        
        /* Add some animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .component-wrapper {
            animation: fadeIn 0.6s ease-out;
        }
        
        /* Responsive improvements */
        @media (max-width: 768px) {
            .component-wrapper {
                margin-bottom: 1.5rem;
            }
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8">
        ${components.length === 0 
          ? `<div class="text-center py-20">
               <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Website</h1>
               <p class="text-xl text-gray-600">Add components to your canvas to see them here!</p>
             </div>`
          : components
              .map((component, index) => {
                const html = component.htmlContent || getDefaultHtml(component)
                return `        <div class="component-wrapper" style="animation-delay: ${index * 0.1}s;">
            ${html}
        </div>`
              })
              .join('\n')
        }
    </div>
    
    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add hover effects to buttons
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-1px)';
                    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });
            });
        });
    </script>
</body>
</html>`
}

export function downloadHtml(htmlContent: string, filename: string = 'website.html') {
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up the URL object
  URL.revokeObjectURL(url)
}