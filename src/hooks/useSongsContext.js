import { useContext } from "react";
import { SongsContext } from "../context/SongsContext";

export const useSongsContext = () => {
  const context = useContext(SongsContext)

  if (context === undefined) {
    throw new Error("useSongsContext() must be used inside a SongsContextProvider")
  }

  return context
}