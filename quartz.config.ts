import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Meal Plan Recipe Book",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // --clr-light-a0
          lightgray: "#f2d5fc", // --clr-primary-a60
          gray: "#e3aaf8", // --clr-primary-a30
          darkgray: "#5f5858", // --clr-surface-a30
          dark: "#1c1414", // --clr-surface-a0
          secondary: "#d17ff4", // --clr-primary-a0
          tertiary: "#d78ef6", // --clr-primary-a10
          highlight: "#d7ac61", // --clr-primary-a50
          textHighlight: "#e8b9fa", // --clr-primary-a40
        },
        darkMode: {
          light: "#1c1414", // --clr-surface-a0
          lightgray: "#5f5858", // --clr-surface-a30
          gray: "#777272", // --clr-surface-a40
          darkgray: "#a398a2", // --clr-surface-tonal-a50
          dark: "#ffffff", // --clr-light-a0
          secondary: "#d17ff4", // --clr-primary-a0
          tertiary: "#d78ef6", // --clr-primary-a10
          highlight: "#3c273a", // --clr-surface-tonal-a0
          textHighlight: "#e8b9fa", // --clr-primary-a40
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
