import { useState } from 'react'
import { useFileSystemContext, Folder, StoredFile } from '@/contexts/FileSystemContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Folder as FolderIcon, FileText, ChevronRight, Home, ArrowLeft } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EvaluationSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (file: StoredFile) => void
}

export function EvaluationSelector({ open, onOpenChange, onSelect }: EvaluationSelectorProps) {
  const { folders, files } = useFileSystemContext()
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)

  const currentFolder = folders.find(f => f.id === currentFolderId)
  
  const currentItems = {
    folders: folders.filter(f => f.parentId === currentFolderId),
    files: files.filter(f => f.folderId === currentFolderId)
  }

  const handleSelect = () => {
    const file = files.find(f => f.id === selectedFileId)
    if (file) {
      onSelect(file)
      onOpenChange(false)
      setSelectedFileId(null)
      setCurrentFolderId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sélectionner une évaluation</DialogTitle>
          <DialogDescription>
            Choisissez une évaluation parmi vos dossiers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground border-b">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 hover:bg-transparent hover:text-foreground"
            onClick={() => setCurrentFolderId(null)}
          >
            <Home className="h-4 w-4" />
          </Button>
          {currentFolder && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {currentFolder.name}
              </span>
            </>
          )}
        </div>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="grid grid-cols-3 gap-4 py-4">
            {currentFolder && (
              <div
                onClick={() => setCurrentFolderId(currentFolder.parentId)}
                className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border-dashed"
              >
                <ArrowLeft className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Retour</span>
              </div>
            )}

            {currentItems.folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setCurrentFolderId(folder.id)}
                className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <FolderIcon className="h-10 w-10 text-blue-500 fill-blue-500/20" />
                <span className="text-sm font-medium text-center truncate w-full">
                  {folder.name}
                </span>
              </div>
            ))}

            {currentItems.files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFileId === file.id 
                    ? 'bg-primary/10 border-primary ring-1 ring-primary' 
                    : 'hover:bg-accent/50'
                }`}
              >
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-center truncate w-full">
                  {file.name}
                </span>
              </div>
            ))}
            
            {currentItems.folders.length === 0 && currentItems.files.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 text-muted-foreground">
                <p>Dossier vide</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSelect} disabled={!selectedFileId}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
