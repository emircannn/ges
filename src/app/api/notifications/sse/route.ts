import { eventEmitter } from "@/lib/events";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const onSubmission = (data: Record<string, unknown>) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (e) {
          console.error("Error enqueuing SSE message:", e);
        }
      };

      // Listen for new submissions
      eventEmitter.on("new-submission", onSubmission);

      // Heartbeat ping every 20 seconds to keep connection open
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(": ping\n\n");
        } catch (e) {
          console.error("Error enqueuing heartbeat:", e);
        }
      }, 20000);

      // Clean up on disconnect
      req.signal.addEventListener("abort", () => {
        eventEmitter.off("new-submission", onSubmission);
        clearInterval(pingInterval);
        try {
          controller.close();
        } catch {
          // Stream might be closed already
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
