import { Metadata } from "next";

export type CustomMetadata = Metadata;

// Or extend it with your own properties if needed
export type AppMetadata = Metadata & {
  // Add any custom properties here if you want
};