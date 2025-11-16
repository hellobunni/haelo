import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that can render as a button, internal link, or external link. Supports multiple variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "periwinkle",
        "dark",
        "outline",
        "ghost",
        "link",
        "destructive",
        "secondary",
        "white",
        "tropical-indigo",
        "gradient",
        "glass",
        "gradient-border",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: [
        "sm",
        "default",
        "lg",
        "xl",
        "full",
        "icon",
        "icon-sm",
        "icon-lg",
      ],
      description: "The size of the button",
    },
    rounded: {
      control: "select",
      options: [true, false, "lg", "full"],
      description: "The rounded corner style of the button",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component using Radix Slot",
    },
    href: {
      control: "text",
      description: "If provided, renders as a link (internal or external)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// All variants showcase
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="periwinkle">Periwinkle</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="white">White</Button>
      <Button variant="tropical-indigo">Tropical Indigo</Button>
    </div>
  ),
};

// Lab variants showcase (gradient, glass, gradient-border)
export const LabVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 bg-[#0a0a0f] rounded-lg">
      <Button variant="gradient" rounded="full">
        Gradient Button
      </Button>
      <Button variant="glass" rounded="full">
        Glass Button
      </Button>
      <Button variant="gradient-border" rounded="full">
        Gradient Border
      </Button>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="full">Full Width</Button>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Heart className="mr-2" />
        Like
      </Button>
      <Button variant="periwinkle">
        Get Started
        <ArrowRight className="ml-2" />
      </Button>
      <Button variant="outline" size="icon">
        <Star />
      </Button>
    </div>
  ),
};

// As links
export const AsLinks: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button href="/about">Internal Link</Button>
      <Button href="https://example.com">External Link</Button>
      <Button href="mailto:hello@example.com">Email Link</Button>
    </div>
  ),
};

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Default</Button>
      <Button variant="periwinkle" disabled>
        Disabled Periwinkle
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

// Rounded variants showcase
export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default" rounded={false}>
        No Rounding
      </Button>
      <Button variant="default">Default (rounded-md)</Button>
      <Button variant="default" rounded="lg">
        Rounded LG
      </Button>
      <Button variant="default" rounded={true}>
        Rounded XL
      </Button>
      <Button variant="default" rounded="full">
        Rounded Full
      </Button>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
    rounded: false,
    disabled: false,
  },
};
