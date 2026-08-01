/**
 * ASTRA Vite configuration — TanStack Start + Nitro + React + Tailwind.
 * Built and maintained by ASTRA.
 */
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Custom SSR entry: src/server.ts
      server: { entry: "server" },
    }),
    // Default Nitro preset works on Vercel; Cloudflare can be set in hosting if needed.
    nitro(),
    viteReact(),
  ],
});
