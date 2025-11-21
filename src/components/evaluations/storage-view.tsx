import { useFileSystem } from '@/hooks/use-file-system'
import { FileSystemList } from './file-system-list'
import { CreateFolderDialog } from './create-folder-dialog'
import { UploadArea } from './upload-area'
import { Button } from '@/components/ui/button'
import { ChevronRight, Home } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function StorageView() {
  const {
    folders,
    files,
    currentFolderId,
    currentItems,
    createFolder,
    uploadFile,
    navigateToFolder
  } = useFileSystem()

  const currentFolder = folders.find(f => f.id === currentFolderId)

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Enregistrer une évaluation
            </h1>
            <p className="text-muted-foreground">
              Gérez vos évaluations et organisez-les dans des dossiers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CreateFolderDialog onCreate={createFolder} />
          </div>
        </div>

        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent hover:text-foreground"
            onClick={() => navigateToFolder(null)}
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
      </div>

      <Separator />

      <div className="grid gap-6">
        <UploadArea onUpload={uploadFile} />
        
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            {currentFolder ? currentFolder.name : 'Mes dossiers'}
          </h2>
          <FileSystemList
            folders={currentItems.folders}
            files={currentItems.files}
            onNavigate={navigateToFolder}
          />
        </div>
      </div>
    </div>
  )
}
