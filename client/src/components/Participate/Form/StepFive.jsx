import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const StepFive = ({ handleFirstStep }) => {
    return (
        <div className='lg:w-1/2 w-full min-h-[32vh] px-6 py-4 bg-slate-100 rounded-lg'>
            <p className='w-full my-2 text-xl font-semibold text-center'>Response saved!</p>

            <div className='flex flex-col items-center justify-center gap-2 mt-6'>
                <CheckCircle2 className='w-32 h-32 text-success' />

                <p className='text-lg'>Thank you! Your response has been submitted succesfully.</p>

                <Button variant="outline" onClick={handleFirstStep}>
                    Submit another response
                </Button>
            </div>
        </div>
    )
}

export default StepFive
