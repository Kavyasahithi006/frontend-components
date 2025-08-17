import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    helperText: "We will not share your email.",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Name",
    placeholder: "Enter name",
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputField label="Filled" variant="filled" placeholder="Filled input" />
      <InputField label="Outlined" variant="outlined" placeholder="Outlined input" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost input" />
    </div>
  ),
};
