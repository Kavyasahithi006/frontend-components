import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

export default function DemoPage() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Demo Form</h1>

      <div className="w-80 flex flex-col gap-4 bg-white p-4 rounded-xl shadow">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button label="Submit" onClick={handleSubmit} />
      </div>

      {submitted && (
        <Card
          title="Submitted!"
          description={`Hello, ${name}. This card was generated using your components 🎉`}
        />
      )}
    </div>
  );
}
