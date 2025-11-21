import { useFileSystem } from '@/hooks/use-file-system'
import { FileSystemList } from './FileSystemList'
import { CreateFolderDialog } from './CreateFolderDialog'
import { AddEvaluationDialog } from './AddEvaluationDialog'
import { Button } from '@/components/ui/button'
import { ChevronRight, Home } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function StorageView() {
  const {
    folders,
    currentFolderId,
    currentItems,
    createFolder,
    uploadFile,
    navigateToFolder
  } = useFileSystem()



  const handleAddEvaluation = (evaluation: any) => {
    console.log('New evaluation:', evaluation)
    uploadFile(evaluation.file, {
      gradingType: evaluation.gradingType,
      classIds: evaluation.classIds
    })
  }

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
            <AddEvaluationDialog onAdd={handleAddEvaluation} />
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
          
          {(() => {
            const path = []
            let current = folders.find(f => f.id === currentFolderId)
            while (current) {
              path.unshift(current)
              current = folders.find(f => f.id === current?.parentId)
            }
            
            return path.map((folder, index) => (
              <div key={folder.id} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-auto p-0 hover:bg-transparent hover:text-foreground ${
                    index === path.length - 1 ? "font-medium text-foreground" : ""
                  }`}
                  onClick={() => navigateToFolder(folder.id)}
                >
                  {folder.name}
                </Button>
              </div>
            ))
          })()}
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        {/* <UploadArea onUpload={uploadFile} /> */}
        
        <div className="flex flex-col gap-4">
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
