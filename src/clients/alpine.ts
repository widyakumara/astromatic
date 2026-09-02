import type { Alpine } from "alpinejs";

interface ContactResponse {
  success: boolean;
  message?: string;
}

const contactHandler = (Alpine: Alpine) => {
  Alpine.data("contact", () => ({
    status: "form" as "form" | "success" | "failed",
    message: "",

    async submit(event: SubmitEvent) {
      event.preventDefault();

      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data = new URLSearchParams();

      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          data.append(key, value);
        }
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: data,
        });

        const result = (await response.json()) as ContactResponse;

        if (!response.ok || !result.success) {
          this.status = "failed";
          this.message = result.message ?? "Failed to send message.";
          return;
        }

        this.status = "success";
      } catch (error) {
        this.status = "failed";
        this.message = "Unable to contact the server.";
        console.error(error);
      }
    },
  }));
};

export default (Alpine: Alpine) => {
  contactHandler(Alpine);
};
