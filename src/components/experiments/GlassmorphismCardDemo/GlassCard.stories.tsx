import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GlassCard from "./GlassCard";

const meta = {
  title: "Experiments/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible glassmorphism card component with backdrop blur effects, hover states, and keyboard navigation. Supports multiple blur intensity levels and can be interactive or static.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    blurIntensity: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Backdrop blur intensity level",
    },
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card description text",
    },
    index: {
      control: "number",
      description: "Index for staggered animation delay",
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    blurIntensity: "lg",
    title: "Glassmorphism Card",
    description: "Frosted glass effect with backdrop blur",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Blur intensity variants
export const BlurIntensities: Story = {
  args: {
    blurIntensity: "lg",
    title: "Glassmorphism Card",
    description: "Frosted glass effect with backdrop blur",
    index: 0,
  },
  render: () => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[400px] w-full max-w-5xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard
          blurIntensity="sm"
          title="Subtle Blur"
          description="backdrop-blur-sm - Light frosted effect"
          index={0}
        />
        <GlassCard
          blurIntensity="md"
          title="Medium Blur"
          description="backdrop-blur-md - Balanced glass effect"
          index={1}
        />
        <GlassCard
          blurIntensity="lg"
          title="Strong Blur"
          description="backdrop-blur-lg - Heavy frosted glass"
          index={2}
        />
        <GlassCard
          blurIntensity="xl"
          title="Maximum Blur"
          description="backdrop-blur-xl - Ultra frosted effect"
          index={3}
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Interactive card
export const Interactive: Story = {
  args: {
    blurIntensity: "lg",
    title: "Clickable Card",
    description: "This card has an onClick handler and is keyboard accessible",
    index: 0,
    onClick: () => {
      alert("Card clicked!");
    },
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-pink-500 via-rose-500 to-orange-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Static card (no onClick)
export const Static: Story = {
  args: {
    blurIntensity: "lg",
    title: "Static Card",
    description: "This card is not clickable (no onClick handler)",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-green-500 via-emerald-500 to-cyan-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// On different backgrounds
export const OnPurpleBackground: Story = {
  args: {
    blurIntensity: "lg",
    title: "Premium Design",
    description: "Glassmorphism card on purple gradient background",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

export const OnPinkBackground: Story = {
  args: {
    blurIntensity: "lg",
    title: "Delightful UI",
    description: "Glassmorphism card on pink gradient background",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-pink-500 via-rose-500 to-orange-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

export const OnTealBackground: Story = {
  args: {
    blurIntensity: "lg",
    title: "Elegant Pattern",
    description: "Glassmorphism card on teal gradient background",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-green-500 via-emerald-500 to-cyan-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// On image background
export const OnImageBackground: Story = {
  args: {
    blurIntensity: "lg",
    title: "Glass on Image",
    description: "Glassmorphism card on image background",
    index: 0,
  },
  render: () => (
    <div className="relative rounded-2xl overflow-hidden min-h-[500px] w-full max-w-5xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=800&fit=crop)",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      {/* Content */}
      <div className="relative p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard
            blurIntensity="sm"
            title="Subtle on Image"
            description="Light blur works great on detailed backgrounds"
            index={0}
          />
          <GlassCard
            blurIntensity="md"
            title="Balanced Effect"
            description="Medium blur provides good readability"
            index={1}
          />
          <GlassCard
            blurIntensity="lg"
            title="Strong Glass"
            description="Heavy blur creates dramatic frosted effect"
            index={2}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Grid showcase
export const GridShowcase: Story = {
  args: {
    blurIntensity: "lg",
    title: "Card Grid",
    description: "Multiple cards in a grid layout",
    index: 0,
  },
  render: () => (
    <div className="p-8 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-[500px] w-full max-w-6xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            blurIntensity: "sm" as const,
            title: "Subtle Effect",
            description: "Light frosted glass with minimal blur",
          },
          {
            blurIntensity: "md" as const,
            title: "Balanced Design",
            description: "Medium blur for optimal readability",
          },
          {
            blurIntensity: "lg" as const,
            title: "Strong Presence",
            description: "Heavy blur for maximum glass effect",
          },
          {
            blurIntensity: "xl" as const,
            title: "Ultra Frosted",
            description: "Maximum blur for dramatic effect",
          },
          {
            blurIntensity: "lg" as const,
            title: "Interactive Card",
            description: "Click me to see keyboard navigation",
            onClick: () => alert("Card clicked!"),
          },
          {
            blurIntensity: "md" as const,
            title: "Static Display",
            description: "Non-interactive card for content display",
          },
        ].map((card, index) => (
          <GlassCard
            key={card.title}
            blurIntensity={card.blurIntensity}
            title={card.title}
            description={card.description}
            index={index}
            onClick={card.onClick}
          />
        ))}
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Long content
export const LongContent: Story = {
  args: {
    blurIntensity: "lg",
    title: "Card with Very Long Title That Might Wrap to Multiple Lines",
    description:
      "This is a card with extended content to demonstrate how the component handles longer text. The description can be quite lengthy and should still look good within the glassmorphism card design.",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px] w-[500px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Short content
export const ShortContent: Story = {
  args: {
    blurIntensity: "lg",
    title: "Minimal",
    description: "Short text",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[200px] w-[300px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// With custom aria-label
export const WithAriaLabel: Story = {
  args: {
    blurIntensity: "lg",
    title: "Accessible Card",
    description: "This card has a custom aria-label for screen readers",
    index: 0,
    onClick: () => alert("Accessible card clicked!"),
    "aria-label":
      "Premium glassmorphism card with frosted glass effect. Click to interact.",
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Staggered animation showcase
export const StaggeredAnimation: Story = {
  args: {
    blurIntensity: "lg",
    title: "Staggered Cards",
    description: "Cards with staggered animation delays",
    index: 0,
  },
  render: () => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[400px] w-full max-w-5xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <GlassCard
            key={num}
            blurIntensity="lg"
            title={`Card ${num}`}
            description={`This is card number ${num} with staggered animation`}
            index={num - 1}
          />
        ))}
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    blurIntensity: "lg",
    title: "Glassmorphism Card",
    description: "Frosted glass effect with backdrop blur",
    index: 0,
  },
  render: (args) => (
    <div className="p-8 bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px] w-[400px] rounded-2xl">
      <GlassCard {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};
