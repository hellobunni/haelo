import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ExperimentCard, { type Experiment } from "./ExperimentCard";

const meta = {
  title: "Sections/Labs/ExperimentCard",
  component: ExperimentCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An animated experiment card component with glassmorphism styling, gradient overlays, and micro-interactions. Perfect for showcasing UI experiments and motion studies in the labs section.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    experiment: {
      description: "The experiment data object",
    },
    index: {
      control: "number",
      description: "Index for staggered animation delay",
    },
  },
} satisfies Meta<typeof ExperimentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample experiment data
const sampleExperiment: Experiment = {
  id: "1",
  title: "Magnetic Button",
  description: "Button that follows cursor with magnetic attraction",
  gradient: "from-purple-500 to-pink-500",
  tag: "Interaction",
  url: "/labs/experiments/magnetic-button",
};

// Default story
export const Default: Story = {
  args: {
    experiment: sampleExperiment,
    index: 0,
  },
};

// With different gradients
export const GradientVariants: Story = {
  args: {
    experiment: sampleExperiment,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ExperimentCard
        experiment={{
          id: "1",
          title: "Purple to Pink",
          description: "Beautiful gradient from purple to pink",
          gradient: "from-purple-500 to-pink-500",
          tag: "Design",
        }}
        index={0}
      />
      <ExperimentCard
        experiment={{
          id: "2",
          title: "Blue to Cyan",
          description: "Cool gradient from blue to cyan",
          gradient: "from-blue-500 to-cyan-500",
          tag: "Motion",
        }}
        index={1}
      />
      <ExperimentCard
        experiment={{
          id: "3",
          title: "Green to Emerald",
          description: "Fresh gradient from green to emerald",
          gradient: "from-green-500 to-emerald-500",
          tag: "UI",
        }}
        index={2}
      />
      <ExperimentCard
        experiment={{
          id: "4",
          title: "Orange to Red",
          description: "Warm gradient from orange to red",
          gradient: "from-orange-500 to-red-500",
          tag: "Animation",
        }}
        index={3}
      />
    </div>
  ),
};

// With background image
export const WithImage: Story = {
  args: {
    experiment: {
      id: "2",
      title: "Glassmorphism Card",
      description: "Frosted glass effect with backdrop blur",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      gradient: "from-blue-500 to-cyan-500",
      tag: "Design",
      url: "/labs/experiments/glassmorphism",
    },
    index: 0,
  },
};

// Without gradient
export const NoGradient: Story = {
  args: {
    experiment: {
      id: "3",
      title: "Minimal Design",
      description: "Clean experiment card without gradient",
      tag: "Minimal",
      url: "/labs/experiments/minimal",
    },
    index: 0,
  },
};

// With URL link
export const WithLink: Story = {
  args: {
    experiment: {
      id: "4",
      title: "Clickable Experiment",
      description: "This card is wrapped in a Link component",
      gradient: "from-green-500 to-emerald-500",
      tag: "Link",
      url: "/labs/experiments/clickable",
    },
    index: 0,
  },
};

// Without URL (not clickable)
export const WithoutLink: Story = {
  args: {
    experiment: {
      id: "5",
      title: "Static Card",
      description: "This card is not clickable (no URL provided)",
      gradient: "from-indigo-500 to-purple-500",
      tag: "Static",
    },
    index: 0,
  },
};

// Using tags array instead of tag
export const WithTagsArray: Story = {
  args: {
    experiment: {
      id: "6",
      title: "Using Tags Array",
      description: "This experiment uses the tags prop instead of tag",
      gradient: "from-rose-500 to-pink-500",
      tags: ["Interaction", "Motion"],
      url: "/labs/experiments/tags",
    },
    index: 0,
  },
};

// With description
export const WithDescription: Story = {
  args: {
    experiment: {
      id: "7",
      title: "Parallax Scroll",
      description: "Layered scrolling effect with depth and smooth animations",
      gradient: "from-teal-500 to-blue-500",
      tag: "Animation",
      url: "/labs/experiments/parallax",
    },
    index: 0,
  },
};

// Without description
export const WithoutDescription: Story = {
  args: {
    experiment: {
      id: "8",
      title: "Simple Title",
      gradient: "from-violet-500 to-purple-500",
      tag: "Simple",
      url: "/labs/experiments/simple",
    },
    index: 0,
  },
};

// Grid showcase
export const GridShowcase: Story = {
  args: {
    experiment: sampleExperiment,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          id: "1",
          title: "Magnetic Button",
          description: "Button that follows cursor with magnetic attraction",
          gradient: "from-purple-500 to-pink-500",
          tag: "Interaction",
        },
        {
          id: "2",
          title: "Glassmorphism",
          description: "Frosted glass effect with backdrop blur",
          gradient: "from-blue-500 to-cyan-500",
          tag: "Design",
        },
        {
          id: "3",
          title: "Parallax Scroll",
          description: "Layered scrolling effect with depth",
          gradient: "from-green-500 to-emerald-500",
          tag: "Animation",
        },
        {
          id: "4",
          title: "Hover Reveal",
          description: "Content reveals on hover with smooth transitions",
          gradient: "from-orange-500 to-red-500",
          tag: "Interaction",
        },
        {
          id: "5",
          title: "3D Card Flip",
          description: "Three-dimensional card flip animation",
          gradient: "from-indigo-500 to-purple-500",
          tag: "3D",
        },
        {
          id: "6",
          title: "Shimmer Effect",
          description: "Animated shimmer loading effect",
          gradient: "from-teal-500 to-cyan-500",
          tag: "Loading",
        },
        {
          id: "7",
          title: "Ripple Effect",
          description: "Click ripple animation with waves",
          gradient: "from-pink-500 to-rose-500",
          tag: "Interaction",
        },
        {
          id: "8",
          title: "Gradient Text",
          description: "Animated gradient text effect",
          gradient: "from-yellow-500 to-amber-500",
          tag: "Typography",
        },
      ].map((experiment, index) => (
        <ExperimentCard
          key={experiment.id}
          experiment={{
            ...experiment,
            url: `/labs/experiments/${experiment.id}`,
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
    experiment: sampleExperiment,
    index: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <ExperimentCard
          key={num}
          experiment={{
            id: String(num),
            title: `Experiment ${num}`,
            description: `This is experiment number ${num} with staggered animation`,
            gradient: "from-purple-500 to-pink-500",
            tag: "Animation",
            url: `/labs/experiments/${num}`,
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
    experiment: {
      id: "9",
      title: "Experiment with Very Long Title That Might Wrap",
      description:
        "This is an experiment card with a very long description that demonstrates how the component handles extended text content. The description should be readable and well-formatted even when it's quite lengthy.",
      gradient: "from-slate-500 to-gray-500",
      tag: "Long",
      url: "/labs/experiments/long",
    },
    index: 0,
  },
};

// Short content
export const ShortContent: Story = {
  args: {
    experiment: {
      id: "10",
      title: "Short",
      gradient: "from-yellow-500 to-amber-500",
      tag: "Min",
      url: "/labs/experiments/short",
    },
    index: 0,
  },
};

// With image and gradient
export const ImageWithGradient: Story = {
  args: {
    experiment: {
      id: "11",
      title: "Image + Gradient",
      description: "Combines background image with gradient overlay",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      gradient: "from-purple-500/50 to-pink-500/50",
      tag: "Hybrid",
      url: "/labs/experiments/hybrid",
    },
    index: 0,
  },
};

// Playground
export const Playground: Story = {
  args: {
    experiment: sampleExperiment,
    index: 0,
  },
};
