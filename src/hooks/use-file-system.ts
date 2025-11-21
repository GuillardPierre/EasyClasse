import { useState, useCallback } from 'react'
import { useFileSystemContext, Folder, StoredFile } from '@/contexts/FileSystemContext'

export type { Folder, StoredFile } from '@/contexts/FileSystemContext'

export function useFileSystem() {
    const { folders, files, createFolder: contextCreateFolder, uploadFile: contextUploadFile } = useFileSystemContext()
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

    const createFolder = useCallback((name: string) => {
        contextCreateFolder(name, currentFolderId)
    }, [contextCreateFolder, currentFolderId])

    const uploadFile = useCallback((file: File, metadata?: { gradingType?: string, classIds?: string[] }) => {
        contextUploadFile(file, currentFolderId, metadata)
    }, [contextUploadFile, currentFolderId])

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
