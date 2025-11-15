import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile badge component for displaying labels, statuses, and tags. Supports multiple variants, sizes, and includes motion animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "lab",
        "success",
        "warning",
        "info",
        "periwinkle",
        "blank",
        "dark",
        "resume-purple",
        "resume-pink",
      ],
      description: "The visual style variant of the badge",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "The size of the badge",
    },
    rounded: {
      control: "select",
      options: [true, false, "default"],
      description: "The rounded corner style of the badge",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component using Radix Slot",
    },
    initial: {
      control: "boolean",
      description: "Disable entrance animation if set to false",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "default",
  },
};

// All variants showcase
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="periwinkle">Periwinkle</Badge>
      <Badge variant="blank">Blank</Badge>
      <Badge variant="dark">Dark</Badge>
      <Badge variant="lab">Lab</Badge>
      <Badge variant="resume-purple">Resume Purple</Badge>
      <Badge variant="resume-pink">Resume Pink</Badge>
    </div>
  ),
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <CheckCircle className="mr-1" />
        Success
      </Badge>
      <Badge variant="destructive">
        <XCircle className="mr-1" />
        Error
      </Badge>
      <Badge variant="warning">
        <AlertCircle className="mr-1" />
        Warning
      </Badge>
      <Badge variant="info">
        <Info className="mr-1" />
        Info
      </Badge>
      <Badge variant="periwinkle">
        <Sparkles className="mr-1" />
        Featured
      </Badge>
      <Badge variant="lab">
        <Sparkles className="mr-1" />
        Lab
      </Badge>
    </div>
  ),
};

// Rounded variants
export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default" rounded={false}>
        No Rounding
      </Badge>
      <Badge variant="default">Default (rounded-md)</Badge>
      <Badge variant="default" rounded={true}>
        Rounded Full
      </Badge>
    </div>
  ),
};

// Status badges (common use case)
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">Paid</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Overdue</Badge>
      <Badge variant="info">Draft</Badge>
      <Badge variant="secondary">Archived</Badge>
    </div>
  ),
};

// Hero badge variants
export const HeroBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="periwinkle" size="lg">
        <Sparkles className="mr-1" />
        New Feature
      </Badge>
      <Badge variant="blank" size="lg">
        <Sparkles className="mr-1" />
        Available Now
      </Badge>
      <Badge variant="dark" size="lg">
        Premium
      </Badge>
    </div>
  ),
};

// Resume badge variants
export const ResumeBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="resume-purple" size="lg">
        Available for Opportunities
      </Badge>
      <Badge variant="resume-pink" size="lg">
        Open to Work
      </Badge>
    </div>
  ),
};

// Lab badge variant (glassmorphism - best on dark backgrounds)
export const LabBadges: Story = {
  render: () => (
    <div className="bg-slate-950 p-8 rounded-lg">
      <div className="flex flex-wrap gap-4">
        <Badge variant="lab" size="lg" rounded={true}>
          <Sparkles className="w-4 h-4" />
          UI Engineering Playground
        </Badge>
        <Badge variant="lab" size="default" rounded={true}>
          <Sparkles className="w-3 h-3" />
          Experiment
        </Badge>
        <Badge variant="lab" size="sm" rounded={true}>
          Lab
        </Badge>
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Lab badges feature glassmorphism styling with backdrop blur, perfect for
        dark backgrounds.
      </p>
    </div>
  ),
};

// Without animation
export const NoAnimation: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default" initial={false}>
        No Entrance Animation
      </Badge>
      <Badge variant="success" initial={false}>
        Static Badge
      </Badge>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "default",
    rounded: false,
    initial: { opacity: 0, scale: 0.8 },
  },
};
