import { useMemo } from "react"
import { useContext, createContext, useState } from "react"

const UIContext = createContext({
  name: 'uicontext'
})

export const ManagedUIContext = ({ children }) => {
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)

  const contextValues = useMemo(
    () => ({
      isEditProductOpen,
      setIsEditProductOpen,
    }),
    [isEditProductOpen, setIsEditProductOpen]
  );

  return (
    <UIContext.Provider value={contextValues}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}
