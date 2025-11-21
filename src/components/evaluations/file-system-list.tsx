import { Folder, StoredFile } from '@/hooks/use-file-system'
import { Folder as FolderIcon, FileText, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface FileSystemListProps {
  folders: Folder[]
  files: StoredFile[]
  onNavigate: (folderId: string) => void
}

export function FileSystemList({ folders, files, onNavigate }: FileSystemListProps) {
  if (folders.length === 0 && files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <FolderIcon className="h-12 w-12 mb-4 opacity-20" />
        <p>Ce dossier est vide</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onNavigate(folder.id)}
          className="group flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <FolderIcon className="h-10 w-10 text-blue-500 fill-blue-500/20 shrink-0" />
            <div className="truncate">
              <p className="font-medium truncate">{folder.name}</p>
              <p className="text-xs text-muted-foreground">Dossier</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {files.map((file) => (
        <div
          key={file.id}
          className="group flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="truncate">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Télécharger</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
