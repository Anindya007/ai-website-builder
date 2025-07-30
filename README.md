# AI Website Builder
AI Website Builder is a modern, intuitive drag-and-drop website creation tool built with Next.js. It allows users to quickly design and build responsive websites without coding knowledge, with the option to export the generated HTML for deployment.

## Features
- Drag-and-Drop Interface : Easily build websites by dragging components onto the canvas
- Component Library : Access a variety of pre-designed components including headers, content sections, and more
- Real-time Preview : See your website take shape as you build it
- HTML Editing : Pro users can directly edit the HTML of any component (subscription managed by Clerk)
- Text Editing : Simple WYSIWYG editor for modifying text content
- Export Functionality : Download your completed website as HTML with Tailwind CSS styling
- Pro Features : Premium components available with Pro subscription (subscription handled by Clerk)
- Responsive Design : Components adapt to different screen sizes
## Getting Started
First, run the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:8887 with your browser to see the application (note the custom port setting in package.json).

## How It Works
1. Select Components : Browse the component palette on the left side
2. Drag to Canvas : Drag components onto the main canvas area
3. Edit Content : Click on components to edit their content using either the text or HTML editor
4. Arrange Components : Reorder components by dragging them within the canvas
5. Preview : Toggle preview mode to see how your website will look
6. Export : Download the complete HTML file when you're satisfied with your design
## Technology Stack
- Next.js : React framework for the frontend
- TypeScript : Type-safe JavaScript
- Tailwind CSS : Utility-first CSS framework for styling
- dnd-kit : Drag and drop functionality
- Clerk : User authentication and management and billing
- Prisma : Database ORM
- Inngest : Background job processing
## Project Structure
- /src/components : UI components including the canvas and component palette
- /src/app : Next.js app router pages and API routes
- /src/lib : Utility functions and HTML generation logic
- /src/types : TypeScript type definitions
- /public : Static assets
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is private and not licensed for public use.

## Learn More
To learn more about the technologies used in this project:

- Next.js Documentation
- Tailwind CSS
- TypeScript
- dnd-kit