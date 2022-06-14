import { useState, useEffect, useRef } from "react";
// styles
import "./SearchBar.css";
// hooks
import { useSongsContext } from "../hooks/useSongsContext";

export default function SearchBar() {
  const [term, setTerm] = useState("")
  const { dispatch } = useSongsContext()
  const searchInputRef = useRef(null)
  const controller = new AbortController()

  const handleSearch = (e) => {
    e.preventDefault()
    fetchSongs(term)
  }

  const fetchSongs = async (term) => {
    searchInputRef.current.blur()
    const url = "https://itunes.apple.com/search?term=" + term
    dispatch({ type: "IS_PENDING" })

    try {
      const res = await fetch(url, {
        signal: controller.signal
      })
      if (!res.ok) {
        dispatch({ type: "ERROR", payload: res.statusText })
      }
      const data = await res.json()

      let uniqueAlbums = data.results.map(item => item.collectionName)
      uniqueAlbums = Array.from(new Set(uniqueAlbums)).sort().slice(0, 5)

      dispatch({ type: "FETCH_SONGS", payload: uniqueAlbums })
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("the fetch was aborted");
      } else {
        dispatch({ type: "ERROR", payload: "Could not fetch the data." })
      }
    }
  }

  useEffect(() => {

    return () => {
      controller.abort()
    }
  }, [term])


  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        required
        placeholder="Search Band"
        onChange={(e) => setTerm(e.target.value)}
        ref={searchInputRef}
      />
    </form>
  )
}
