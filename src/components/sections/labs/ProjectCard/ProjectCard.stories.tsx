import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectCard, { type LabsProject } from "./ProjectCard";

const meta = {
  title: "Sections/Labs/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An animated project card component with hover effects, gradient overlays, and glassmorphism styling. Perfect for showcasing featured projects in the labs section.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    project: {
      description: "The project data object",
    },
    index: {
      control: "number",
      description: "Index for staggered animation delay",
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample project data
const sampleProject: LabsProject = {
  id: "1",
  title: "Interactive Dashboard",
  description:
    "A modern, responsive dashboard with real-time data visualization and interactive charts. Built with React and TypeScript.",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  gradient: "from-purple-500 to-pink-500",
  tags: ["React", "TypeScript", "Next.js"],
  url: "/projects/1",
};

// Default story
export const Default: Story = {
  args: {
    project: sampleProject,
    index: 0,
  },
};

// With different gradients
export const GradientVariants: Story = {
  args: {
    project: sampleProject,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        project={{
          id: "1",
          title: "Purple to Pink",
          description: "Beautiful gradient from purple to pink",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          gradient: "from-purple-500 to-pink-500",
          tags: ["Design", "UI"],
        }}
        index={0}
      />
      <ProjectCard
        project={{
          id: "2",
          title: "Blue to Teal",
          description: "Cool gradient from blue to teal",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          gradient: "from-blue-500 to-teal-500",
          tags: ["Development", "Frontend"],
        }}
        index={1}
      />
      <ProjectCard
        project={{
          id: "3",
          title: "Orange to Red",
          description: "Warm gradient from orange to red",
          image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
          gradient: "from-orange-500 to-red-500",
          tags: ["Backend", "API"],
        }}
        index={2}
      />
    </div>
  ),
};

// Without gradient
export const NoGradient: Story = {
  args: {
    project: {
      id: "2",
      title: "Minimal Design",
      description: "A clean project card without gradient overlay",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["Minimal", "Clean"],
      url: "/projects/2",
    },
    index: 0,
  },
};

// With URL link
export const WithLink: Story = {
  args: {
    project: {
      id: "3",
      title: "Clickable Project",
      description: "This card is wrapped in a Link component",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      gradient: "from-green-500 to-emerald-500",
      tags: ["Link", "Navigation"],
      url: "/projects/3",
    },
    index: 0,
  },
};

// Without URL (not clickable)
export const WithoutLink: Story = {
  args: {
    project: {
      id: "4",
      title: "Static Card",
      description: "This card is not clickable (no URL provided)",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gradient: "from-indigo-500 to-purple-500",
      tags: ["Static", "Display"],
    },
    index: 0,
  },
};

// Multiple tags
export const ManyTags: Story = {
  args: {
    project: {
      id: "5",
      title: "Multi-Tag Project",
      description:
        "This project has many tags, but only the first 3 are displayed",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      gradient: "from-cyan-500 to-blue-500",
      tags: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind",
        "Framer Motion",
        "Storybook",
      ],
      url: "/projects/5",
    },
    index: 0,
  },
};

// Using categories instead of tags
export const WithCategories: Story = {
  args: {
    project: {
      id: "6",
      title: "Using Categories",
      description: "This project uses the categories prop instead of tags",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      gradient: "from-rose-500 to-pink-500",
      tags: [],
      categories: ["Web App", "Mobile", "Design System"],
      url: "/projects/6",
    },
    index: 0,
  },
};

// Using imageUrl instead of image
export const WithImageUrl: Story = {
  args: {
    project: {
      id: "7",
      title: "Using imageUrl",
      description: "This project uses imageUrl prop instead of image",
      image: "",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gradient: "from-violet-500 to-purple-500",
      tags: ["Image", "URL"],
      url: "/projects/7",
    },
    index: 0,
  },
};

// Using href instead of url
export const WithHref: Story = {
  args: {
    project: {
      id: "8",
      title: "Using href",
      description: "This project uses href prop instead of url",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      gradient: "from-amber-500 to-orange-500",
      tags: ["Link", "Href"],
      href: "/projects/8",
    },
    index: 0,
  },
};

// Grid showcase
export const GridShowcase: Story = {
  args: {
    project: sampleProject,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          id: "1",
          title: "E-Commerce Platform",
          description:
            "A full-featured e-commerce solution with payment integration",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          gradient: "from-blue-500 to-cyan-500",
          tags: ["E-Commerce", "Payment", "Full-Stack"],
        },
        {
          id: "2",
          title: "Design System",
          description: "Comprehensive design system with reusable components",
          image:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
          gradient: "from-purple-500 to-pink-500",
          tags: ["Design", "Components", "System"],
        },
        {
          id: "3",
          title: "Analytics Dashboard",
          description:
            "Real-time analytics with interactive data visualization",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          gradient: "from-green-500 to-emerald-500",
          tags: ["Analytics", "Data", "Visualization"],
        },
        {
          id: "4",
          title: "Mobile App",
          description: "Native mobile application with cross-platform support",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
          gradient: "from-orange-500 to-red-500",
          tags: ["Mobile", "React Native", "iOS"],
        },
        {
          id: "5",
          title: "API Gateway",
          description:
            "Scalable API gateway with authentication and rate limiting",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
          gradient: "from-indigo-500 to-purple-500",
          tags: ["API", "Backend", "Gateway"],
        },
        {
          id: "6",
          title: "Portfolio Website",
          description: "Modern portfolio website with smooth animations",
          image:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
          gradient: "from-teal-500 to-cyan-500",
          tags: ["Portfolio", "Web", "Animation"],
        },
      ].map((project, index) => (
        <ProjectCard
          key={project.id}
          project={{
            ...project,
            url: `/projects/${project.id}`,
          }}
          index={index}
        />
      ))}
    </div>
  ),
};

// Staggered animation showcase
export const StaggeredAnimation: Story = {
  args: {
    project: sampleProject,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <ProjectCard
          key={num}
          project={{
            id: String(num),
            title: `Project ${num}`,
            description: `This is project number ${num} with staggered animation`,
            image: `https://images.unsplash.com/photo-${1551288049 + num}?w=800&h=600&fit=crop`,
            gradient: "from-purple-500 to-pink-500",
            tags: ["Project", "Animation", "Staggered"],
            url: `/projects/${num}`,
          }}
          index={num - 1}
        />
      ))}
    </div>
  ),
};

// Long content
export const LongContent: Story = {
  args: {
    project: {
      id: "9",
      title: "Project with Very Long Title That Might Wrap to Multiple Lines",
      description:
        "This is a project card with a very long description that demonstrates how the component handles extended text content. The description should be readable and well-formatted even when it's quite lengthy. This helps ensure the card remains visually appealing regardless of content length.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gradient: "from-slate-500 to-gray-500",
      tags: ["Long", "Content", "Testing"],
      url: "/projects/9",
    },
    index: 0,
  },
};

// Short content
export const ShortContent: Story = {
  args: {
    project: {
      id: "10",
      title: "Short",
      description: "Brief.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      gradient: "from-yellow-500 to-amber-500",
      tags: ["Short"],
      url: "/projects/10",
    },
    index: 0,
  },
};

// Playground
export const Playground: Story = {
  args: {
    project: sampleProject,
    index: 0,
  },
};
