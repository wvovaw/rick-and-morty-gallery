import { getEpisode } from "../api";
import type { IEpisode } from "@/models/rick-and-morty";

const cache = new Map<string, IEpisode>();

export async function useEpisode(url: string): Promise<IEpisode | undefined> {
  if (cache.has(url)) {
    return cache.get(url);
  }
  else {
    const epUrl = new URL(url);
    const epId = epUrl.pathname.substring("/api/episode/".length);
    const ep = await getEpisode(Number(epId));
    if (ep)
      cache.set(url, ep);
    return ep;
  }
}
