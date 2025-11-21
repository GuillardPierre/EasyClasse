import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type FileType = 'pdf' | 'doc' | 'docx' | 'other'

export interface StoredFile {
  id: string
  name: string
  type: FileType
  size: number
  createdAt: Date
  folderId: string | null
  gradingType?: string
  classIds?: string[]
}

export interface Folder {
  id: string
  name: string
  createdAt: Date
  parentId: string | null
}

interface FileSystemContextType {
  folders: Folder[]
  files: StoredFile[]
  createFolder: (name: string, parentId: string | null) => void
  uploadFile: (file: File, folderId: string | null, metadata?: { gradingType?: string, classIds?: string[] }) => void
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined)

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Mathématiques', createdAt: new Date(), parentId: null },
    { id: '2', name: 'Français', createdAt: new Date(), parentId: null },
  ])
  
  const [files, setFiles] = useState<StoredFile[]>([
    {
      id: 'file-1',
      name: 'Contrôle Chapitre 1.pdf',
      type: 'pdf',
      size: 1024 * 500, // 500KB
      createdAt: new Date(),
      folderId: '1',
    },
    {
      id: 'file-2',
      name: 'Dictée.docx',
      type: 'docx',
      size: 1024 * 20, // 20KB
      createdAt: new Date(),
      folderId: '2',
    }
  ])

  const createFolder = useCallback((name: string, parentId: string | null) => {
    console.log('TODO: Create folder', { name, parentId })
    const newFolder: Folder = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      createdAt: new Date(),
      parentId,
    }
    setFolders((prev) => [...prev, newFolder])
  }, [])

  const uploadFile = useCallback((file: File, folderId: string | null, metadata?: { gradingType?: string, classIds?: string[] }) => {
    console.log('TODO: Upload file', { file, folderId, metadata })
    const newFile: StoredFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.split('.').pop() as FileType || 'other',
      size: file.size,
      createdAt: new Date(),
      folderId,
      ...metadata
    }
    setFiles((prev) => [...prev, newFile])
  }, [])

  return (
    <FileSystemContext.Provider value={{ folders, files, createFolder, uploadFile }}>
      {children}
    </FileSystemContext.Provider>
  )
}

export function useFileSystemContext() {
  const context = useContext(FileSystemContext)
  if (context === undefined) {
    throw new Error('useFileSystemContext must be used within a FileSystemProvider')
  }
  return context
}
