import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className='w-full flex flex-col min-h-screen justify-center items-center'>
            <div className="text-center space-y-5">
                <h2 className='font-bold text-4xl'>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link className={buttonVariants()}  href="/">Return Home</Link>
            </div>
        </div>
    )
}
