import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GlassCardShowcase from "./GlassCardShowcase";

const meta = {
  title: "Experiments/GlassCardShowcase",
  component: GlassCardShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive showcase of the GlassCard component featuring blur intensity variations, interactive vs static modes, different background gradients, grid layouts, and content variations. This matches what's displayed on the experiments detail page.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlassCardShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - full showcase
export const Default: Story = {
  render: () => (
    <div className="w-full min-h-screen p-8 bg-[#0a0a0f]">
      <GlassCardShowcase />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

// In a container (simulating experiments detail page)
export const InDetailPage: Story = {
  render: () => (
    <div className="p-8 md:p-12 rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10">
      <GlassCardShowcase />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

// Playground
export const Playground: Story = {
  render: () => (
    <div className="w-full min-h-screen p-8 bg-[#0a0a0f]">
      <GlassCardShowcase />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      disable: true,
    },
  },
};

