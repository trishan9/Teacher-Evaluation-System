import { useForm } from 'react-hook-form';
import questions from '@/constants/questions';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const StepThree = ({ handlePreviousStep, handleNextStep, survey }) => {
    const subjects = survey.subjects
    const defaultValues = localStorage.getItem("step3") ? JSON.parse(localStorage.getItem("step3")) : null

    const form = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    const onSubmit = (values) => {
        handleNextStep(values)
    }

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] py-4 px-6 bg-slate-100 rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>3</span> of <span className='font-semibold'>4</span></p>

            <p className='mb-4 text-sm italic text-center'>(Your teachers won't have access to your feedback, so please give honest feedback for the betterment of your education.)</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-end gap-12 mt-6'>
                    {questions.map((question, index) => (
                        <div key={question.id} className='flex flex-col w-full gap-4'>
                            <p className='text-lg font-semibold'>{index + 1}. {question.en}.</p>

                            <p className='mb-2 -mt-4 text-lg'>{question.np}</p>

                            {subjects.map((subject) => (
                                <div key={subject} className='flex flex-col items-center gap-2 mb-2'>
                                    <p className='font-semibold'>{subject} Teacher</p>

                                    <FormField
                                        control={form.control}
                                        name={`rating-${subject}-${question.id}`}
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value ?? "2"}
                                                        className="flex items-center justify-between w-full gap-2"
                                                    >
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="1" id={`rating-${subject}-${question.id}-hd`} />
                                                                    <Label htmlFor={`rating-${subject}-${question.id}-hd`} className="text-xs md:text-sm">Highly Disagree</Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>

                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="2" id={`rating-${subject}-${question.id}-d`} />
                                                                    <Label htmlFor={`rating-${subject}-${question.id}-d`} className="text-xs md:text-sm">Disagree</Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>

                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="3" id={`rating-${subject}-${question.id}-a`} />
                                                                    <Label htmlFor={`rating-${subject}-${question.id}-a`} className="text-xs md:text-sm">Agree</Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>

                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="4" id={`rating-${subject}-${question.id}-ha`} />
                                                                    <Label htmlFor={`rating-${subject}-${question.id}-ha`} className="text-xs md:text-sm">Highly Agree</Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className='flex items-center justify-between w-full'>
                        <button
                            type="button"
                            onClick={handlePreviousStep}
                            className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                        >
                            Previous
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </Form>
        </div >
    )
}

export default StepThree
