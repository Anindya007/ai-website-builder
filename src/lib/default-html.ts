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
      if (component.id.includes("group")) {
        return `<div class="flex flex-wrap gap-3 justify-center">
  <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Primary
  </button>
  <button class="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors">
    Secondary
  </button>
  <button class="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
    Outline
  </button>
  <button class="text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
    Text
  </button>
</div>`
      }
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
      if (component.id.includes("gallery")) {
        return `<div class="py-8">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">Gallery</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+1" alt="Gallery Image 1" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+2" alt="Gallery Image 2" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+3" alt="Gallery Image 3" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+4" alt="Gallery Image 4" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+5" alt="Gallery Image 5" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
      <img src="/placeholder.svg?height=300&width=300&text=Image+6" alt="Gallery Image 6" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
    </div>
  </div>
</div>`
      }
      return `<div class="text-center">
  <img src="/placeholder.svg?height=300&width=600&text=Your+Image+Here" 
       alt="Placeholder Image" 
       class="w-full max-w-2xl h-64 object-cover rounded-lg mx-auto shadow-lg" />
  <p class="text-sm text-gray-500 mt-2">Replace with your own image</p>
</div>`

    case "footer":
      if (component.id.includes("detailed")) {
        return `<footer class="bg-gray-900 text-white py-12">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="text-xl font-bold mb-4">Company</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Press</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Products</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" class="hover:text-white transition-colors">API</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Support</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Community</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Stay Connected</h3>
        <p class="text-gray-300 mb-4">Subscribe to our newsletter for updates</p>
        <div class="flex mb-4">
          <input type="email" placeholder="Enter your email" 
                 class="flex-1 px-4 py-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500" />
          <button class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white">
            <span class="sr-only">Twitter</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <span class="sr-only">Facebook</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <span class="sr-only">LinkedIn</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400">&copy; 2024 Your Company. All rights reserved.</p>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
        <a href="#" class="text-gray-400 hover:text-white text-sm">Terms of Service</a>
        <a href="#" class="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>`
      }
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
      if (component.id.includes("basic")) {
        return `<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
      <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Name" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
      <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
      <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="How can we help?" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
      <textarea class="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell us more about your inquiry..." required></textarea>
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Send Message
    </button>
  </form>
</div>`
      }
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

    case "navbar":
      return `<nav class="bg-white shadow-sm border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <span class="text-xl font-bold text-gray-900">Logo</span>
        </div>
        <div class="hidden md:block ml-10">
          <div class="flex items-baseline space-x-4">
            <a href="#" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  </div>
</nav>`

    case "header":
      return `<header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
  <div class="max-w-4xl mx-auto text-center px-4">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">Ready to Get Started?</h1>
    <p class="text-xl mb-8 opacity-90">Join thousands of satisfied customers today</p>
    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
      Start Free Trial
    </button>
  </div>
</header>`

    case "newsletter":
      return `<div class="bg-blue-50 p-8 rounded-lg text-center max-w-md mx-auto">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
  <p class="text-gray-600 mb-6">Get the latest news and updates delivered to your inbox.</p>
  <form class="space-y-4">
    <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email address" required />
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Subscribe Now
    </button>
  </form>
  <p class="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
</div>`

    case "login":
      return `<div class="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Sign In</h2>
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input type="password" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required />
    </div>
    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span class="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
      <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Forgot password?</a>
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Sign In
    </button>
  </form>
  <p class="text-center text-sm text-gray-600 mt-4">
    Don't have an account? <a href="#" class="text-blue-600 hover:text-blue-500">Sign up</a>
  </p>
</div>`

    case "registration":
      return `<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Create Account</h2>
  <form class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="John" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Doe" required />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="john@example.com" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input type="password" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <input type="password" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required />
    </div>
    <div>
      <label class="flex items-center">
        <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
        <span class="ml-2 text-sm text-gray-600">I agree to the <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a></span>
      </label>
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Create Account
    </button>
  </form>
  <p class="text-center text-sm text-gray-600 mt-4">
    Already have an account? <a href="#" class="text-blue-600 hover:text-blue-500">Sign in</a>
  </p>
</div>`

    case "feedback":
      return `<div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 mb-6">We'd Love Your Feedback</h2>
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your experience?</label>
      <div class="flex space-x-1">
        <button type="button" class="text-2xl text-gray-300 hover:text-yellow-400">⭐</button>
        <button type="button" class="text-2xl text-gray-300 hover:text-yellow-400">⭐</button>
        <button type="button" class="text-2xl text-gray-300 hover:text-yellow-400">⭐</button>
        <button type="button" class="text-2xl text-gray-300 hover:text-yellow-400">⭐</button>
        <button type="button" class="text-2xl text-gray-300 hover:text-yellow-400">⭐</button>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">What did you like most?</label>
      <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option>Select an option</option>
        <option>Easy to use</option>
        <option>Great design</option>
        <option>Fast performance</option>
        <option>Helpful support</option>
        <option>Other</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
      <textarea class="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell us more about your experience..."></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
      <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Submit Feedback
    </button>
  </form>
</div>`

    case "search":
      return `<div class="max-w-md mx-auto">
  <div class="relative">
    <input type="text" class="w-full p-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Search..." />
    <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </button>
  </div>
  <div class="mt-2 text-sm text-gray-500 text-center">
    Press Enter to search or click the search icon
  </div>
</div>`

    case "survey":
      return `<div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Survey</h2>
  <form class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">1. How often do you use our service?</label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input type="radio" name="frequency" class="text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Daily</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="frequency" class="text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Weekly</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="frequency" class="text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Monthly</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="frequency" class="text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Rarely</span>
        </label>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">2. Which features do you use most? (Select all that apply)</label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Dashboard</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Reports</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Analytics</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span class="ml-2">Integrations</span>
        </label>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">3. Any suggestions for improvement?</label>
      <textarea class="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your suggestions..."></textarea>
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
      Submit Survey
    </button>
  </form>
</div>`

    case "file":
      return `<div class="max-w-md mx-auto">
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="text-sm text-gray-600 mb-2">
      <label class="cursor-pointer">
        <span class="text-blue-600 hover:text-blue-500">Upload a file</span>
        <input type="file" class="sr-only" />
      </label>
      <span> or drag and drop</span>
    </div>
    <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
  </div>
  <div class="mt-4">
    <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
      Upload File
    </button>
  </div>
</div>`

    case "cta":
      return `<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-lg text-center">
  <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
  <p class="text-xl mb-8 opacity-90">Join thousands of satisfied customers today and transform your business.</p>
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
      Start Free Trial
    </button>
    <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
      Learn More
    </button>
  </div>
</div>`

    case "feature":
      return `<div class="py-12">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div class="text-center">
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
      <p class="text-gray-600">Experience blazing fast performance with our optimized platform.</p>
    </div>
    <div class="text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Reliable</h3>
      <p class="text-gray-600">99.9% uptime guarantee with enterprise-grade infrastructure.</p>
    </div>
    <div class="text-center">
      <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Secure</h3>
      <p class="text-gray-600">Bank-level security with end-to-end encryption for your data.</p>
    </div>
  </div>
</div>`

    case "faq":
      return `<div class="max-w-3xl mx-auto py-12">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
  <div class="space-y-4">
    <div class="border border-gray-200 rounded-lg">
      <button class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
        <span class="font-medium">What is included in the free plan?</span>
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="px-6 pb-4 text-gray-600">
        Our free plan includes up to 5 projects, basic templates, and community support. Perfect for getting started!
      </div>
    </div>
    <div class="border border-gray-200 rounded-lg">
      <button class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
        <span class="font-medium">Can I upgrade or downgrade my plan anytime?</span>
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
    <div class="border border-gray-200 rounded-lg">
      <button class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
        <span class="font-medium">Do you offer customer support?</span>
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
    <div class="border border-gray-200 rounded-lg">
      <button class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
        <span class="font-medium">Is my data secure?</span>
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  </div>
</div>`

    case "stats":
      return `<div class="bg-gray-50 py-12 rounded-lg">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact in Numbers</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-4xl font-bold text-blue-600 mb-2">10K+</div>
        <div class="text-gray-600">Happy Customers</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-green-600 mb-2">99.9%</div>
        <div class="text-gray-600">Uptime</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-purple-600 mb-2">50M+</div>
        <div class="text-gray-600">API Requests</div>
      </div>
      <div>
        <div class="text-4xl font-bold text-orange-600 mb-2">24/7</div>
        <div class="text-gray-600">Support</div>
      </div>
    </div>
  </div>
</div>`

    case "team":
      return `<div class="py-12">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div class="text-center">
      <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span class="text-2xl text-gray-600">👨‍💼</span>
      </div>
      <h3 class="text-xl font-semibold mb-1">John Smith</h3>
      <p class="text-blue-600 mb-2">CEO & Founder</p>
      <p class="text-gray-600 text-sm">Leading the vision and strategy for our company's growth and innovation.</p>
    </div>
    <div class="text-center">
      <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span class="text-2xl text-gray-600">👩‍💻</span>
      </div>
      <h3 class="text-xl font-semibold mb-1">Sarah Johnson</h3>
      <p class="text-blue-600 mb-2">CTO</p>
      <p class="text-gray-600 text-sm">Overseeing technical architecture and ensuring our platform stays cutting-edge.</p>
    </div>
    <div class="text-center">
      <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span class="text-2xl text-gray-600">👨‍🎨</span>
      </div>
      <h3 class="text-xl font-semibold mb-1">Mike Chen</h3>
      <p class="text-blue-600 mb-2">Head of Design</p>
      <p class="text-gray-600 text-sm">Creating beautiful and intuitive user experiences that delight our customers.</p>
    </div>
  </div>
</div>`

    case "video":
      return `<div class="max-w-4xl mx-auto">
  <div class="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
    <div class="absolute inset-0 flex items-center justify-center">
      <button class="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
        <svg class="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </div>
    <div class="absolute bottom-4 left-4 text-white">
      <h3 class="text-lg font-semibold">Product Demo Video</h3>
      <p class="text-sm opacity-75">Learn how to get started in 5 minutes</p>
    </div>
  </div>
  <p class="text-center text-sm text-gray-500 mt-4">Click to play video</p>
</div>`

    case "two":
      return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
  <div>
    <h2 class="text-3xl font-bold text-gray-900 mb-4">About Our Service</h2>
    <p class="text-gray-600 mb-6">
      We provide innovative solutions that help businesses grow and succeed in today's competitive market. 
      Our team of experts is dedicated to delivering exceptional results.
    </p>
    <ul class="space-y-2 text-gray-600">
      <li class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        Expert team with 10+ years experience
      </li>
      <li class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        24/7 customer support
      </li>
      <li class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        Money-back guarantee
      </li>
    </ul>
  </div>
  <div>
    <img src="/placeholder.svg?height=400&width=500&text=Service+Image" 
         alt="Service" 
         class="w-full h-80 object-cover rounded-lg shadow-lg" />
  </div>
</div>`

    case "three":
      return `<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="text-center">
    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl">🚀</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Fast Setup</h3>
    <p class="text-gray-600">Get started in minutes with our quick and easy setup process.</p>
  </div>
  <div class="text-center">
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl">⚡</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">High Performance</h3>
    <p class="text-gray-600">Experience lightning-fast performance with our optimized platform.</p>
  </div>
  <div class="text-center">
    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl">🔒</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Secure</h3>
    <p class="text-gray-600">Your data is protected with enterprise-grade security measures.</p>
  </div>
</div>`

    case "card":
      return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-xl">📊</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Analytics</h3>
    <p class="text-gray-600 mb-4">Track your performance with detailed analytics and insights.</p>
    <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Learn more →</a>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-xl">🎯</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Targeting</h3>
    <p class="text-gray-600 mb-4">Reach the right audience with precision targeting tools.</p>
    <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Learn more →</a>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-xl">🔧</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Integration</h3>
    <p class="text-gray-600 mb-4">Connect with your favorite tools and platforms seamlessly.</p>
    <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Learn more →</a>
  </div>
</div>`

    default:
      return `<div class="text-center py-8 text-gray-500">
  <h3 class="text-lg font-medium mb-2">${component.name}</h3>
  <p>Edit this component to add your custom HTML content.</p>
</div>`
  }
}
