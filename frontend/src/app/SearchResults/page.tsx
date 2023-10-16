import React from 'react'

const page = ({ 
  searchParams, 
}: { 
  searchParams: {
    seSelection: string;
    claimSelection: string;
  }}) => {
  return (
    <div>
      <p>
        {searchParams.seSelection}
      </p>
      <p>
        {searchParams.claimSelection}
      </p>
    </div>
  )
}

export default page