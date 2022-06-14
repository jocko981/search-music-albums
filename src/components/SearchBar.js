import { useState, useEffect } from "react";
// styles
import "./SearchBar.css";
// hooks
import { useSongsContext } from "../hooks/useSongsContext";

export default function SearchBar() {
  const [term, setTerm] = useState("")
  const { dispatch } = useSongsContext()
  const controller = new AbortController()

  const handleSearch = (e) => {
    e.preventDefault()

    // search API with term
    fetchSongs(term)
  }

  const fetchSongs = async (term) => {
    const url = "https://itunes.apple.com/search?term=" + term
    dispatch({ type: "IS_PENDING" })

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        mode: "cors", signal: controller.signal
      })
      if (!res.ok) {
        dispatch({ type: "ERROR", payload: res.statusText })
      }
      const data = await res.json()
      // console.log("res", res);
      // console.log("data", data);

      const collectionNames = ['Radiohead: The Alan Cross Guide (Unabridged)', 'Opie & Anthony, June 28, 2012', 'True Stories (Bonus Track Version)', 'True Stories (Bonus Track Version)', 'Instrumentals, Vol. 1 (Remastered)', 'Earth Mountain', 'Lifelike', 'Night Sessions', 'In Rainbows', 'In Rainbows', 'In Rainbows', 'In Rainbows', 'In Rainbows', 'In Rainbows', 'Pablo Honey', 'In Rainbows', 'In Rainbows', 'In Rainbows', 'The Twilight Saga: New Moon (Deluxe Version) [Original Motion Picture Soundtrack]', 'In Rainbows', 'Lullaby Renditions of Radiohead', 'OK Computer', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'The Eraser', 'A Moon Shaped Pool', 'Lullaby Renditions of Radiohead', 'A Moon Shaped Pool', 'True Stories, A Film By David Byrne: The Complete Soundtrack', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'A Moon Shaped Pool', 'Old News - EP', 'The Bends', 'Lullaby Renditions of Radiohead', 'The King of Limbs', 'Lullaby Renditions of Radiohead', 'The Bends', 'OK Computer', 'Radiohead - Single', 'Strung Out On OK Computer: VSQ Performs Radiohead', 'Lullaby Renditions of Radiohead', 'Lullaby Renditions of Radiohead', 'OK Computer', 'OK Computer', 'Lullaby Renditions of Radiohead']
      const uniqueCollectionNames = Array.from(new Set(collectionNames)).sort().slice(0, 5)

      // console.log("radiohead", uniqueCollectionNames);
      dispatch({ type: "FETCH_SONGS", payload: uniqueCollectionNames })
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
      />
    </form>
  )
}
