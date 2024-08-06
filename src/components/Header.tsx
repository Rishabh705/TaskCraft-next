import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Profile from './Profile'
import { ClipboardList } from 'lucide-react'

const Header = () => {
  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      {/* Main header container */}
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center justify-between'>
              {/* Left side of the header */}
              <div className='ml-4 flex items-center gap-4 lg:ml-0'>
                {/* Logo and title */}
                <Link href='/'>
                  <ClipboardList className=''/>
                </Link>
                <Link href='/'>
                  <h1 className='text-3xl font-semibold mb-1'>TaskCraft</h1>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Header
