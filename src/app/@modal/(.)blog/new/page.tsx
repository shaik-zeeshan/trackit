import { BlogCreationForm } from "@/app/blog/new/page";
import { Modal } from "../modal";

export default function Page() {
  return (
    <Modal url="/blog/new">
      <div className="space-y-2">
        <div>
          <h1 className="text-3xl font-bold">Create a new blog</h1>
          <p className="text-gray-500 text-sm">
            Create a new blog by providing the URL of the blog.
          </p>
        </div>
        <BlogCreationForm />
      </div>
    </Modal>
  );
}
