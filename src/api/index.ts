import type { ICharacter, IEpisode } from "@/models/rick-and-morty";

interface IGetMany<T = any> {
  info: {
    count: number;
    pages: number;
    next: string;
    pref: number | null;
  };
  results: T[];
}

async function api<T>(endpoint: string): Promise<T | undefined> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
  if (!response.ok)
    throw new Error(`Request error: ${response.status}`);

  return response.json();
}

type GetCharactersResponse = IGetMany<ICharacter>;
export async function getCharacters(page = 1): Promise<GetCharactersResponse | undefined> {
  try {
    const data = await api<GetCharactersResponse>(`/character/?page=${page}`);
    return data;
  }
  catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

type GetEpisodeResponse = IEpisode;
export async function getEpisode(id: number): Promise<GetEpisodeResponse | undefined> {
  try {
    const data = await api<GetEpisodeResponse>(`/episode/${id}`);
    return data;
  }
  catch (error) {
    console.error("Error fetching episode:", error);
    throw error;
  }
}
