import { createContext, useReducer } from "react";

export const SongsContext = createContext()

const songsReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, error: null, songs: null }
    case "ERROR":
      return { isPending: false, error: action.payload, songs: null }
    case "FETCH_SONGS":
      return { isPending: false, error: null, songs: action.payload }

    default:
      return state
  }
}

export function SongsContextProvider({ children }) {
  const [state, dispatch] = useReducer(songsReducer, {
    isPending: false,
    error: null,
    songs: null
  })

  return (
    <SongsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SongsContext.Provider>
  )
}