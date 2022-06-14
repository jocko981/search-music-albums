import { useEffect, useState } from "react";
// hooks
import { useSongsContext } from "../hooks/useSongsContext";

export default function List() {
  const [defaultItems, setDefaultItems] = useState(["A", "B", "C", "D", "E"])
  const { songs, isPending } = useSongsContext()

  useEffect(() => {
    const rearangeItems = () => {

      setDefaultItems((prevState) => {
        const defaultArr = [...prevState]

        if (songs) {
          const songsArr = songs.filter(value => !defaultArr.includes(value))

          if (songsArr.length) {
            defaultArr.push(songsArr.shift())
            defaultArr.shift()
          } else {
            defaultArr.push(defaultArr.shift())
          }
        } else {
          defaultArr.push(defaultArr.shift())
        }

        // console.log("arr2", songsArr);
        // console.log("arr", defaultArr);

        return defaultArr
      })
    }

    const interval = setInterval(() => {
      if (!isPending) {
        rearangeItems()
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [isPending])

  return (
    <div>
      <ul>
        {defaultItems.map(item => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
