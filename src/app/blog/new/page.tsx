import { Form, FormButton, FormProps } from "@/components/form";
import { Input } from "@/components/ui/input";
import { handleMDXAction } from "@/lib/actions/urls";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="p-20">
      <div>
        <h1 className="text-3xl font-bold">Create a new blog</h1>
        <p className="text-gray-500">
          Create a new blog by providing the URL of the blog.
        </p>
        <BlogCreationForm />
      </div>
    </div>
  );
}

export function BlogCreationForm() {
  return (
    <Form className="space-y-5" action={handleMDXAction as FormProps["action"]}>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input type="text" name="url" />
      </div>
      <FormButton>Submit</FormButton>
    </Form>
  );
}
