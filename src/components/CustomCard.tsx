import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CustomCard({
  children,
  title,
  description,
  image,
  imagePosition = 'left',
}: {
  children: React.ReactNode
  title: string
  description?: string
  image?: string
  imagePosition?: 'left' | 'right'
}) {
  if (!image) {
    return (
      <div className="w-full px-4 sm:px-0 sm:w-[95%] lg:w-[75%] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    )
  }

  // Card avec image - layout deux colonnes
  return (
    <div className="w-full px-4 sm:px-0 sm:w-[95%] lg:w-[75%] mx-auto">
      <Card>
        <div
          className={`flex flex-col md:flex-row  ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="w-full md:w-1/2 p-6">
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 pt-8 flex flex-col">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1">{children}</CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
