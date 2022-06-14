import { useEffect } from "react";
// context
import { useSongsContext } from "./useSongsContext";

export const useFetch = () => {
  const { dispatch } = useSongsContext()

  const fetchSongs = async (term) => {
    const controller = new AbortController()

    const url = "https://itunes.apple.com/search?term=" + term

    dispatch({ type: "IS_PENDING" })

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        dispatch({ type: "ERROR", payload: res.statusText })
      }

      const data = await res.json()

      dispatch({ TYPE: "FETCH_SONGS", payload: data })
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("the fetch was aborted");
      } else {
        dispatch({ type: "ERROR", payload: "Could not fetch the data." })
      }
    }
  }

  return { fetchSongs }
}
