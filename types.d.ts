// types.d.ts
import type { ParsedUrlQuery } from "querystring";

declare module "next" {
  // тут ми перекриваємо некоректне визначення PageProps
  export interface PageProps<P extends ParsedUrlQuery = ParsedUrlQuery> {
    params: P;
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}
