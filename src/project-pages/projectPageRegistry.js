import { defineAsyncComponent } from "vue";

export const projectPageComponents = {
  p2p: defineAsyncComponent(() => import("./P2PCoopPage.vue")),
  "p2p-server": defineAsyncComponent(() => import("./MatchmakingServerPage.vue")),
  "elemental-3d": defineAsyncComponent(() => import("./Elemental3DPage.vue")),
  tower: defineAsyncComponent(() => import("./TowerDefensePage.vue")),
  cards: defineAsyncComponent(() => import("./CardsServerPage.vue")),
  "device-manager": defineAsyncComponent(() => import("./DeviceManagerPage.vue")),
  screenshot: defineAsyncComponent(() => import("./ScreenshotToolPage.vue")),
  "face-scan": defineAsyncComponent(() => import("./FaceScanPage.vue")),
  "miracast-bridge": defineAsyncComponent(() => import("./MiracastBridgePage.vue")),
  "lipreading-studio": defineAsyncComponent(() => import("./LipreadingStudioPage.vue")),
  "tribal-war": defineAsyncComponent(() => import("./TribalWarPage.vue")),
  "tribal-war-2d": defineAsyncComponent(() => import("./TribalWar2DPage.vue")),
  "branching-narrative": defineAsyncComponent(() => import("./BranchingNarrativePage.vue")),
  conutline: defineAsyncComponent(() => import("./ConutlinePage.vue")),
  breconn: defineAsyncComponent(() => import("./BreconnPage.vue")),
};
