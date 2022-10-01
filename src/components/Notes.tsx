import React from 'react'

type Props = {
   data: string[]
}

const Notes = ({ data }: Props) => {
   return (
      <>
         {data.map((value: any) => (
            <p>{value}</p>
         ))}
      </>
   )
}

export default Notes
