import React from 'react';
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function MyComponent() {
  const [isShowing, setIsShowing] = useState(true)

  return (
    <>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>



      <Transition
        show={isShowing}
        enter="transition-opacity duration-575"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-350"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
  <button
    type="button"
    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  >
    Primary Button
  </button>      </Transition>
    </>
  )
}