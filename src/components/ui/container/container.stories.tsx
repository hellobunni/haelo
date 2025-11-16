import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Container from "./container";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible container component with configurable max-width, padding, and semantic HTML element support. Perfect for creating consistent layouts across your application.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "The maximum width of the container",
    },
    paddingX: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Horizontal padding (left and right)",
    },
    paddingY: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
      description: "Vertical padding (top and bottom)",
    },
    as: {
      control: "select",
      options: ["div", "section", "main", "article", "header", "footer"],
      description: "The HTML element to render as",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
        Default container (max-w-7xl, px-6, py-4)
      </div>
    ),
    size: "xl",
    paddingX: "md",
    paddingY: "sm",
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Small (max-w-3xl)
        </h3>
        <Container
          size="sm"
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
        >
          <div className="text-center">Small container content</div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Medium (max-w-5xl)
        </h3>
        <Container
          size="md"
          className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
        >
          <div className="text-center">Medium container content</div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Large (max-w-6xl)
        </h3>
        <Container
          size="lg"
          className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4"
        >
          <div className="text-center">Large container content</div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Extra Large (max-w-7xl) - Default
        </h3>
        <Container
          size="xl"
          className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4"
        >
          <div className="text-center">Extra large container content</div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          2XL (max-w-[90rem])
        </h3>
        <Container
          size="2xl"
          className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4"
        >
          <div className="text-center">2XL container content</div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Full Width
        </h3>
        <Container
          size="full"
          className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
        >
          <div className="text-center">Full width container content</div>
        </Container>
      </div>
    </div>
  ),
};

// Padding variants
export const Padding: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          No Padding
        </h3>
        <Container
          paddingX="none"
          paddingY="none"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
            Content with no container padding
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Small Padding (px-4, py-4)
        </h3>
        <Container
          paddingX="sm"
          paddingY="sm"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
            Content with small padding
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Medium Padding (px-6, py-6) - Default X
        </h3>
        <Container
          paddingX="md"
          paddingY="md"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
            Content with medium padding
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Large Padding (px-8, py-8)
        </h3>
        <Container
          paddingX="lg"
          paddingY="lg"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
            Content with large padding
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Extra Large Padding (px-12, py-12)
        </h3>
        <Container
          paddingX="xl"
          paddingY="xl"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded">
            Content with extra large padding
          </div>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          Large Vertical Padding (py-32)
        </h3>
        <Container
          paddingX="md"
          paddingY="4xl"
          className="bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
            Content with 4xl vertical padding
          </div>
        </Container>
      </div>
    </div>
  ),
};

// Semantic HTML elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          As Section
        </h3>
        <Container
          as="section"
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
        >
          <h2 className="text-xl font-bold mb-2">Section Title</h2>
          <p>This is rendered as a &lt;section&gt; element.</p>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          As Main
        </h3>
        <Container
          as="main"
          className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
        >
          <h2 className="text-xl font-bold mb-2">Main Content</h2>
          <p>This is rendered as a &lt;main&gt; element.</p>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          As Article
        </h3>
        <Container
          as="article"
          className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4"
        >
          <h2 className="text-xl font-bold mb-2">Article Title</h2>
          <p>This is rendered as an &lt;article&gt; element.</p>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          As Header
        </h3>
        <Container
          as="header"
          className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4"
        >
          <h2 className="text-xl font-bold mb-2">Header Content</h2>
          <p>This is rendered as a &lt;header&gt; element.</p>
        </Container>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
          As Footer
        </h3>
        <Container
          as="footer"
          className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4"
        >
          <p>This is rendered as a &lt;footer&gt; element.</p>
        </Container>
      </div>
    </div>
  ),
};

// Real-world usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          Hero Section
        </h3>
        <Container
          as="section"
          size="lg"
          paddingY="4xl"
          className="bg-linear-to-br from-purple-500 to-blue-500 text-white rounded-lg"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
            <p className="text-lg opacity-90">
              This is a hero section using Container with large size and extra
              padding
            </p>
          </div>
        </Container>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          Content Section
        </h3>
        <Container
          as="section"
          size="md"
          paddingY="xl"
          className="bg-gray-50 dark:bg-gray-900 rounded-lg"
        >
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Content Section</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is a typical content section with medium container size and
              large vertical padding. Perfect for blog posts, articles, or
              general content areas.
            </p>
          </div>
        </Container>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          Compact Section
        </h3>
        <Container
          as="section"
          size="sm"
          paddingY="md"
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300">
              A compact section with small container size and medium padding
            </p>
          </div>
        </Container>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          Full Width with Custom Padding
        </h3>
        <Container
          size="full"
          paddingX="xl"
          paddingY="lg"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg"
        >
          <div className="text-center">
            <p>Full width container with extra large horizontal padding</p>
          </div>
        </Container>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Container Playground</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Adjust the controls to see how the container changes
        </p>
      </div>
    ),
    size: "xl",
    paddingX: "md",
    paddingY: "sm",
    as: "div",
  },
};
