declare module "next" {
  export interface NextConfig {
    [key: string]: any;
  }

  export type Metadata = {
    metadataBase?: URL;
    title?: string | { default: string; template: string };
    description?: string;
    keywords?: string[];
    authors?: { name: string; url?: string }[];
    creator?: string;
    publisher?: string;
    robots?: any;
    openGraph?: any;
    twitter?: any;
    alternates?: any;
    icons?: any;
    [key: string]: any;
  };

  export type Viewport = {
    themeColor?: string;
    width?: string;
    initialScale?: number;
    maximumScale?: number;
    userScalable?: boolean;
    [key: string]: any;
  };

  export namespace MetadataRoute {
    export type Robots = {
      rules:
        | {
            userAgent: string | string[];
            allow?: string | string[];
            disallow?: string | string[];
            crawlDelay?: number;
          }
        | Array<{
            userAgent: string | string[];
            allow?: string | string[];
            disallow?: string | string[];
            crawlDelay?: number;
          }>;
      sitemap?: string | string[];
      host?: string;
    };
    export type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
    }>;
  }
}

declare module "next/link" {
  import type { AnchorHTMLAttributes, FC } from "react";
  export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
  }
  const Link: FC<LinkProps>;
  export default Link;
}

declare module "next/image" {
  import type { ImgHTMLAttributes, FC } from "react";
  export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
    src: string | any;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: "eager" | "lazy";
    placeholder?: "blur" | "empty";
    blurDataURL?: string;
    unoptimized?: boolean;
    sizes?: string;
  }
  const Image: FC<ImageProps>;
  export default Image;
}

declare module "next/navigation" {
  export function usePathname(): string;
  export function useRouter(): {
    push(href: string, options?: any): void;
    replace(href: string, options?: any): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(href: string): void;
  };
  export function useSearchParams(): URLSearchParams;
  export function useParams<T = Record<string, string | string[]>>(): T;
  export function notFound(): never;
  export function redirect(url: string): never;
}

declare module "next/script" {
  import type { ScriptHTMLAttributes, FC } from "react";
  export interface ScriptProps extends ScriptHTMLAttributes<HTMLScriptElement> {
    strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
    id?: string;
    onLoad?: () => void;
    onError?: (e: any) => void;
  }
  const Script: FC<ScriptProps>;
  export default Script;
}

declare module "next/font/google" {
  export function JetBrains_Mono(options: any): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
  export function Inter(options: any): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
}

declare module "next/types.js" {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module "next/server.js" {
  export class NextRequest extends Request {}
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static next(init?: any): NextResponse;
  }
}
