import Image from 'next/image';
import React from 'react'


interface Label {
    label : string
}

const Empty = ({label}: Label) => {
  return (
    <div className="h-full p-4 flex flex-col
    items-center justify-center">
        <div className="h-72 w-72 md:h-96 md:w-96 relative">
            <Image
            src="/engineer.png"
            alt="Project-start"
            fill
            sizes="w-full h-full"
            />
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}

export { Empty };