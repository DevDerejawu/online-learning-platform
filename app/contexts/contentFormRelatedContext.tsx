"use client"
import { createContext, useState, useContext, ReactNode } from "react";
import { typeForFilteredContentsToBuildTable } from "../customTypes/types";

type contextType = {
  contentForEditting: typeForFilteredContentsToBuildTable;
  contentOfType: string | null;
  openDialog: boolean;
  setContentOfType: (val: string | null) => void;
  setContentForEditting: (val: typeForFilteredContentsToBuildTable) => void;
  setOpenDialog: (val: boolean) => void;
  isAddingState:boolean;
  setIsAddingState:(val:boolean)=>void
};
const ContentFormTypeContext = createContext<contextType | null>(null);

export function ContentFormTypeProvider({ children }: { children: ReactNode }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [contentOfType, setContentOfType] = useState<string | null>(null);
  const [contentForEditting, setContentForEditting] =
    useState<typeForFilteredContentsToBuildTable>(null);
  const [isAddingState, setIsAddingState] = useState<boolean>(true)

  return (
    <ContentFormTypeContext.Provider
      value={{
        contentForEditting,
         isAddingState, 
         contentOfType,
         openDialog, setOpenDialog,
        setContentForEditting,
        setContentOfType,
        setIsAddingState
      }}
    >
      {children}
    </ContentFormTypeContext.Provider>
  );
}
export function useFormTypeId() {
  const context = useContext(ContentFormTypeContext);
  if (!context) {
    throw new Error(
      "useFormTypeId must be used within a ContentFormTypeProvider"
    );
  }
  return context;
}
