import React from 'react'

const Heading = ({firstText, secondText }) => {
  return (
     <div className="text-[#A37159] flex items-start w-full mb-4 pl-[2%]">
          <h1 className="sm:text-[55px] text-[33px] w-[80%] sm:w-auto leading-none">{firstText}<br className="block sm:hidden" /><span className="text-[#C5A184]">{" "}{secondText}</span></h1>
        </div>
  )
}

export default Heading
