import type { ComponentType } from "@/types/components"

export function getDefaultHtml(component: ComponentType): string {
  switch (component.id.split("-")[0]) {
    case "hero":
      return component.id.includes("animated")
        ? `<div class="text-center py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
  <h1 class="text-5xl font-bold mb-6 animate-pulse">🎬 Animated Hero Section</h1>
  <p class="text-xl mb-8 opacity-90">Dynamic hero with video background and animations</p>
  <button class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
    Get Started
  </button>
</div>`
        : `<div class="text-center py-16 bg-gray-50 rounded-lg">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Website</h1>
  <p class="text-xl text-gray-600 mb-8">Build amazing websites with our drag-and-drop builder</p>
  <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
    Get Started
  </button>
</div>`

    case "button":
      return `<div class="flex justify-center">
  <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Click Me
  </button>
</div>`

    case "text":
      return `<div class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">About Our Service</h2>
  <p class="text-gray-700 mb-4">
    This is a text block component. You can add any content here including paragraphs, lists, and more formatting options.
  </p>
  <ul class="list-disc list-inside text-gray-700 space-y-2">
    <li>Easy to customize</li>
    <li>Responsive design</li>
    <li>SEO optimized</li>
  </ul>
</div>`

    case "image":
      return `<div class="text-center">
  <img src="/placeholder.svg?height=300&width=600&text=Your+Image+Here" 
       alt="Placeholder Image" 
       class="w-full max-w-2xl h-64 object-cover rounded-lg mx-auto shadow-lg" />
  <p class="text-sm text-gray-500 mt-2">Replace with your own image</p>
</div>`

    case "footer":
      return `<footer class="bg-gray-900 text-white p-8 rounded-lg">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="font-bold text-lg mb-4">Company</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-white">About</a></li>
          <li><a href="#" class="hover:text-white">Careers</a></li>
          <li><a href="#" class="hover:text-white">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-4">Products</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-white">Features</a></li>
          <li><a href="#" class="hover:text-white">Pricing</a></li>
          <li><a href="#" class="hover:text-white">Support</a></li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <h3 class="font-bold text-lg mb-4">Newsletter</h3>
        <p class="text-gray-300 mb-4">Stay updated with our latest news</p>
        <div class="flex gap-2">
          <input type="email" placeholder="Enter your email" 
                 class="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
          <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
      <p>&copy; 2024 Your Website. All rights reserved.</p>
    </div>
  </div>
</footer>`

    case "pricing":
      return `<div class="py-8">
  <h2 class="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <h3 class="text-xl font-semibold mb-4">Basic</h3>
      <div class="text-3xl font-bold mb-4 text-blue-600">$9<span class="text-sm text-gray-500">/mo</span></div>
      <ul class="space-y-2 mb-6 text-gray-600">
        <li>✓ 5 Projects</li>
        <li>✓ Basic Support</li>
        <li>✓ 1GB Storage</li>
      </ul>
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Choose Basic
      </button>
    </div>
    <div class="border-2 border-blue-500 rounded-lg p-6 text-center hover:shadow-lg transition-shadow relative">
      <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
        Popular
      </div>
      <h3 class="text-xl font-semibold mb-4">Pro</h3>
      <div class="text-3xl font-bold mb-4 text-blue-600">$29<span class="text-sm text-gray-500">/mo</span></div>
      <ul class="space-y-2 mb-6 text-gray-600">
        <li>✓ Unlimited Projects</li>
        <li>✓ Priority Support</li>
        <li>✓ 10GB Storage</li>
        <li>✓ Advanced Features</li>
      </ul>
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Choose Pro
      </button>
    </div>
    <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <h3 class="text-xl font-semibold mb-4">Enterprise</h3>
      <div class="text-3xl font-bold mb-4 text-blue-600">$99<span class="text-sm text-gray-500">/mo</span></div>
      <ul class="space-y-2 mb-6 text-gray-600">
        <li>✓ Everything in Pro</li>
        <li>✓ 24/7 Support</li>
        <li>✓ 100GB Storage</li>
        <li>✓ Custom Integrations</li>
      </ul>
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Choose Enterprise
      </button>
    </div>
  </div>
</div>`

    case "testimonials":
      return `<div class="py-8 bg-gray-50 rounded-lg">
  <h2 class="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div class="ml-4">
          <h4 class="font-semibold">John Doe</h4>
          <p class="text-gray-500 text-sm">CEO, TechCorp</p>
        </div>
      </div>
      <p class="text-gray-700 italic">"This website builder is amazing! It saved us so much time and the results look professional."</p>
      <div class="flex text-yellow-400 mt-4">
        ★★★★★
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          SM
        </div>
        <div class="ml-4">
          <h4 class="font-semibold">Sarah Miller</h4>
          <p class="text-gray-500 text-sm">Designer, CreativeStudio</p>
        </div>
      </div>
      <p class="text-gray-700 italic">"The drag-and-drop interface is intuitive and the components are beautifully designed."</p>
      <div class="flex text-yellow-400 mt-4">
        ★★★★★
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          MJ
        </div>
        <div class="ml-4">
          <h4 class="font-semibold">Mike Johnson</h4>
          <p class="text-gray-500 text-sm">Founder, StartupXYZ</p>
        </div>
      </div>
      <p class="text-gray-700 italic">"Perfect for non-technical founders like me. I built our landing page in just a few hours!"</p>
      <div class="flex text-yellow-400 mt-4">
        ★★★★★
      </div>
    </div>
  </div>
</div>`

    case "contact":
      return `<div class="max-w-2xl mx-auto py-8">
  <h2 class="text-3xl font-bold text-center mb-8">Get In Touch</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 class="text-xl font-semibold mb-4">Contact Information</h3>
      <div class="space-y-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            📧
          </div>
          <span>hello@example.com</span>
        </div>
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            📞
          </div>
          <span>+1 (555) 123-4567</span>
        </div>
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            📍
          </div>
          <span>123 Business St, City, State 12345</span>
        </div>
      </div>
    </div>
    <div>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Name" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea class="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your message..."></textarea>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>`

    case "analytics":
      return `<div class="py-8">
  <h2 class="text-3xl font-bold text-center mb-8">Analytics Dashboard</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
      <div class="text-3xl font-bold text-blue-600 mb-2">1,234</div>
      <div class="text-sm text-gray-600">Total Visitors</div>
      <div class="text-xs text-green-600 mt-1">↗ +12% from last month</div>
    </div>
    <div class="bg-green-50 p-6 rounded-lg text-center border border-green-200">
      <div class="text-3xl font-bold text-green-600 mb-2">89%</div>
      <div class="text-sm text-gray-600">Conversion Rate</div>
      <div class="text-xs text-green-600 mt-1">↗ +5% from last month</div>
    </div>
    <div class="bg-purple-50 p-6 rounded-lg text-center border border-purple-200">
      <div class="text-3xl font-bold text-purple-600 mb-2">$12,345</div>
      <div class="text-sm text-gray-600">Revenue</div>
      <div class="text-xs text-green-600 mt-1">↗ +23% from last month</div>
    </div>
    <div class="bg-orange-50 p-6 rounded-lg text-center border border-orange-200">
      <div class="text-3xl font-bold text-orange-600 mb-2">2.5m</div>
      <div class="text-sm text-gray-600">Page Views</div>
      <div class="text-xs text-green-600 mt-1">↗ +8% from last month</div>
    </div>
  </div>
  <div class="bg-white p-6 rounded-lg border border-gray-200">
    <h3 class="text-lg font-semibold mb-4">Traffic Overview</h3>
    <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <span class="text-gray-500">Chart visualization would go here</span>
    </div>
  </div>
</div>`

    case "ecommerce":
      return `<div class="py-8">
  <h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Product Image</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">Premium Headphones</h3>
        <p class="text-gray-600 text-sm mb-3">High-quality wireless headphones with noise cancellation</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-green-600">$199</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Product Image</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">Smart Watch</h3>
        <p class="text-gray-600 text-sm mb-3">Feature-rich smartwatch with health monitoring</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-green-600">$299</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Product Image</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">Laptop Stand</h3>
        <p class="text-gray-600 text-sm mb-3">Ergonomic aluminum laptop stand for better posture</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-green-600">$79</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Product Image</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">Wireless Mouse</h3>
        <p class="text-gray-600 text-sm mb-3">Precision wireless mouse with long battery life</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-green-600">$49</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`

    default:
      return `<div class="text-center py-8 text-gray-500">
  <h3 class="text-lg font-medium mb-2">${component.name}</h3>
  <p>Edit this component to add your custom HTML content.</p>
</div>`
  }
}
