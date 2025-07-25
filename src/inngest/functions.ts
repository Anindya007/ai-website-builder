import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    //Imagine this is a download step that takes a while
    await step.sleep("wait-a-moment", "30s");
    //Imagine this is a transcipt step that takes a while
    await step.sleep("wait-a-moment", "10s");

    //Imagine this is a summary step that takes a while
    await step.sleep("wait-a-moment", "5s");
    return { message: `Hello ${event.data.email}!` };
  },
);