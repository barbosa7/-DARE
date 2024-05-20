import { WEBHOOK_URL } from "@/data/constants";
import axios from "axios";
import "server-only";

// Define types for the options
interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

interface WebhookOptions {
  title?: string;
  description?: string;
  color?: number;
  fields?: EmbedField[];
  footer?: string;
  footerIcon?: string;
  timestamp?: Date;
  author?: EmbedAuthor;
  thumbnail?: string;
  image?: string;
}

// Define type for the embed object
interface Embed {
  title?: string;
  description?: string;
  color?: number;
  fields?: EmbedField[];
  footer?: { text: string; icon_url?: string };
  timestamp?: Date;
  author?: EmbedAuthor;
  thumbnail?: { url: string };
  image?: { url: string };
}

export async function sendWebhook(
  options: WebhookOptions = {},
  url: string = WEBHOOK_URL
): Promise<void> {
  // Set default values
  const {
    title = "",
    description = "",
    color = 0x00ff00, // Default color: green
    fields = [],
    footer = "",
    footerIcon = "",
    timestamp = new Date(),
    author = {},
    thumbnail = "",
    image = "",
  } = options;

  // Construct the embed object
  const embed: Embed = {
    title,
    description,
    color,
    fields: fields.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field.inline || false,
    })),
    footer: {
      text: footer,
      icon_url: footerIcon,
    },
    timestamp,
    author: {
      name: author.name || "",
      url: author.url || "",
      icon_url: author.icon_url || "",
    },
    thumbnail: {
      url: thumbnail,
    },
    image: {
      url: image,
    },
  };

  // Remove empty fields from the embed object
  Object.keys(embed).forEach((key) => {
    const value = embed[key as keyof Embed];
    if (
      value === "" ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete embed[key as keyof Embed];
    }
  });

  // Prepare the payload
  const payload = {
    embeds: [embed],
  };

  try {
    // Send the webhook
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Webhook sent successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Error sending webhook:",
      error.response ? error.response.data : error.message
    );
  }
}
