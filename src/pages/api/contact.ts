import type { APIRoute } from "astro";

export const prerender = false;

const form = {
  id: "1FAIpQLScbpk3Urh-AEnoJI-4d_wOl_vjj0QY1BJ91hByKOxjicYAKeA",
  fields: {
    name: 1555709670,
    mail: 1265659939,
    message: 234879967,
  },
};

export const POST = (async ({ request }) => {
  const contentType = request.headers.get("content-type");

  if (!contentType?.startsWith("application/x-www-form-urlencoded")) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Content-Type must be application/x-www-form-urlencoded",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const body = await request.formData();
    const data = new URLSearchParams();

    for (const [key, fieldId] of Object.entries(form.fields)) {
      const value = body.get(key);

      if (typeof value === "string") {
        data.append(`entry.${fieldId}`, value);
      }
    }

    const url = `https://docs.google.com/forms/d/e/${form.id}/formResponse`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    if (!response.ok) {
      console.error(`Google Forms returned HTTP ${response.status}`);

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to submit the contact form.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Unable to submit the contact form.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}) satisfies APIRoute;
