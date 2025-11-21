import { useState, useCallback } from 'react'

export type FileType = 'pdf' | 'doc' | 'docx' | 'other'

export interface StoredFile {
    id: string
    name: string
    type: FileType
    size: number
    createdAt: Date
    folderId: string | null
}

export interface Folder {
    id: string
    name: string
    createdAt: Date
    parentId: string | null
}

export function useFileSystem() {
    const [folders, setFolders] = useState<Folder[]>([
        { id: '1', name: 'Mathématiques', createdAt: new Date(), parentId: null },
        { id: '2', name: 'Français', createdAt: new Date(), parentId: null },
    ])

    const [files, setFiles] = useState<StoredFile[]>([])
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

    const createFolder = useCallback((name: string) => {
        console.log('TODO: Create folder', { name, parentId: currentFolderId })
        const newFolder: Folder = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            createdAt: new Date(),
            parentId: currentFolderId,
        }
        setFolders((prev) => [...prev, newFolder])
    }, [currentFolderId])

    const uploadFile = useCallback((file: File) => {
        console.log('TODO: Upload file', { file, folderId: currentFolderId })
        const newFile: StoredFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.name.split('.').pop() as FileType || 'other',
            size: file.size,
            createdAt: new Date(),
            folderId: currentFolderId,
        }
        setFiles((prev) => [...prev, newFile])
    }, [currentFolderId])

    const navigateToFolder = useCallback((folderId: string | null) => {
        setCurrentFolderId(folderId)
    }, [])

    const currentItems = {
        folders: folders.filter(f => f.parentId === currentFolderId),
        files: files.filter(f => f.folderId === currentFolderId)
    }

    return {
        folders,
        files,
        currentFolderId,
        currentItems,
        createFolder,
        uploadFile,
        navigateToFolder
    }
}
