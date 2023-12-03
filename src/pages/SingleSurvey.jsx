import { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import { utils, writeFile } from "xlsx";
import { ArrowLeftIcon, NoSymbolIcon, QuestionMarkCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { ArrowDownOnSquareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSingleSurveyData, useBaseUrl } from '@/hooks';
import { CopyIcon } from "@/components/Icons";
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip);

const SingleSurvey = () => {
    const { slug: id } = useParams();
    const [participants, setParticipants] = useState([])
    const [isSearchNotFound, setIsSearchNotFound] = useState(false)
    const [copied, setCopied] = useState(false);
    const [copiedId, setCopiedId] = useState(0);
    const { survey, isLoading, isError } = useSingleSurveyData(id)
    const baseUrl = useBaseUrl()
    const navigate = useNavigate()

    useEffect(() => {
        if (survey && survey.participants) {
            setParticipants(survey.participants)
        }
    }, [survey])

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setCopiedId(id);

        setTimeout(() => {
            setCopied(false);
            setCopiedId(0);
        }, 1200);
    };

    const handleDownload = (name, data) => {
        const payload = data.map(({ studentDetails }) => studentDetails);
        const worksheet = utils.json_to_sheet(payload);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Data");
        writeFile(workbook, `${name}.xlsx`);
    };

    const handleSearch = (query) => {
        const filteredParticipants = survey.participants.filter(({ studentDetails }) => {
            return studentDetails.studentName.toLowerCase().startsWith(query.toLowerCase());
        })
        if (filteredParticipants.length > 0) {
            setIsSearchNotFound(false)
            setParticipants(filteredParticipants);
        } else {
            setParticipants(filteredParticipants);
            setIsSearchNotFound(true)
        }
    }

    return (
        <div className='w-full text-accent_primary'>
            <button onClick={() => navigate(-1)}>
                <ArrowLeftIcon className='w-6 cursor-pointer' />
            </button>

            {isLoading && <p>Loading...</p>}

            {!isLoading && !survey && isError && <p className='text-red-600'>Some error occurred. Please try again.</p>}

            {!isLoading && survey &&
                <div className='flex flex-col w-full gap-6 my-6'>
                    <p className='text-2xl font-semibold'>{survey.name}</p>

                    <div className='flex gap-4'>
                        <button
                            disabled={survey.status === "EXPIRED"}
                            onClick={() =>
                                handleCopy(`${baseUrl}${survey.uri}`, survey.id)
                            }
                            className={clsx(
                                'flex items-center gap-3 px-6 py-3 transition-all ease-in-out disabled:bg-gray-200 disabled:cursor-not-allowed border-2 rounded-md ',
                                copied && copiedId == survey.id
                                    ? "bg-gray-100"
                                    : "bg-white hover:bg-gray-100"
                            )}
                        >
                            {copied && copiedId == survey.id ? "Survey Link Copied" : "Copy Survey Link"}

                            {copied && copiedId == survey.id ? (
                                <CheckCircleIcon className="w-6" />
                            ) : (
                                <CopyIcon />
                            )}
                        </button>

                        <button disabled={survey.status === "EXPIRED"} className='flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all ease-in-out border-2 rounded-md disabled:bg-error/60 disabled:cursor-not-allowed bg-error hover:bg-error/75'>
                            End Survey

                            <NoSymbolIcon className='w-6' />
                        </button>
                    </div>

                    <div className="flex flex-col w-full gap-6 p-6 bg-white border-2 rounded-lg">
                        <p className='text-xl'>Totals</p>

                        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
                            <div className="bg-brand-white py-[34px] flex flex-col gap-4 justify-between items-center border border-light-border rounded-lg">
                                <p className="text-5xl font-medium">{survey && survey.participants ? survey.participants.length : 0}</p>

                                <p className="text-lg text-gray-400">Participants</p>
                            </div>

                            <div className="bg-brand-white py-[34px] flex flex-col gap-4 justify-between items-center border border-light-border rounded-lg">
                                <p className="text-5xl font-medium">{survey ? survey.totalStudents : 0}</p>

                                <p className="text-lg text-gray-400">Students</p>
                            </div>

                            <div className="bg-brand-white py-[34px] flex flex-col gap-4 justify-between items-center border border-light-border rounded-lg">
                                <p className="text-5xl font-medium">{survey && survey.subjects ? survey.subjects.length : 0}</p>

                                <div className='flex items-center gap-3'>
                                    <p className="text-lg text-gray-400">Included Subjects</p>

                                    <div className="tooltip tooltip-bottom" data-tip={survey && survey.subjects && survey.subjects.join(", ")}>
                                        <QuestionMarkCircleIcon className='w-5 cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid items-stretch w-full grid-cols-1 gap-6 lg:grid-cols-2'>
                        <div className='w-full p-6 bg-white border-2 rounded-lg'>
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-xl font-semibold'>Survey Analytics</p>

                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='bg-[#0FADCF] w-4 h-4 rounded-full' />

                                        <p>Total Students</p>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <div className='bg-[#6577F3] w-4 h-4 rounded-full' />

                                        <p>Total Participants</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 my-6">
                                <Doughnut datasetIdKey='id'
                                    data={{
                                        datasets: [{
                                            data: [survey && survey.participants ? survey.participants.length : 0, survey && survey.totalStudents ? survey.totalStudents : 0],
                                            backgroundColor: [
                                                '#6577F3',
                                                '#0FADCF',
                                            ],
                                            hoverOffset: 4,
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: 125
                                    }}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-6 p-6 bg-white border-2 rounded-lg'>
                            <p className='text-xl font-semibold'>Survey Details</p>

                            <div className='flex items-end justify-between w-full'>
                                <div className='flex flex-col gap-6 text-base font-medium'>
                                    <p>Survey Name</p>

                                    <p>Survey ID</p>

                                    <p>Expiration</p>

                                    <p>Status</p>

                                    <p>Included Subjects</p>

                                    <p>Total Participants</p>

                                    <p>Total Expected Students</p>
                                </div>

                                <div className='flex flex-col items-end gap-6 text-base font-light'>
                                    {survey && survey.subjects && survey.participants &&
                                        <Fragment>
                                            <p>{survey.name}</p>

                                            <p>{survey.surveyId}</p>

                                            <p>{survey.expiry}</p>

                                            <p className={
                                                clsx('px-6 py-1 font-medium  rounded-md',
                                                    survey.status === "ACTIVE" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                                                )}
                                            >
                                                {survey.status}
                                            </p>

                                            <div className='flex items-center gap-3'>
                                                <p>{survey.subjects.length}</p>

                                                <div className="tooltip tooltip-left" data-tip={survey.subjects.join(", ")}>
                                                    <QuestionMarkCircleIcon className='w-5 cursor-pointer' />
                                                </div>
                                            </div>

                                            <p>{survey.participants.length}</p>

                                            <p>{survey.totalStudents}</p>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className="flex flex-col items-center justify-between w-full gap-4 px-4 py-6 bg-white border-2 rounded-t-lg sm:flex-row sm:items-center sm:px-8 border-light-border ">
                            <p className="text-xl font-semibold">Participants</p>

                            {survey && survey.participants && survey.participants.length > 0 &&
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            handleDownload(survey.name, survey.participants)
                                        }
                                        className="flex items-center gap-3 px-6 py-3 transition-all ease-in-out bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed "
                                    >
                                        Export

                                        <ArrowDownOnSquareIcon className="w-6" />
                                    </button>

                                    <div className="relative flex items-center w-full">
                                        <input onChange={(e) => handleSearch(e.target.value)} id="email" placeholder="Search Participants" className="w-full py-3 pl-6 pr-10 border border-gray-300 rounded-md outline-none placeholder" type="email" />

                                        <MagnifyingGlassIcon className='absolute right-[16px] ml-4 w-6' />
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="mb-12 bg-white border rounded-b-lg border-light-border">
                            <div className="flow-root mt-4">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                                <tr className='font-semibold text-gray-500'>
                                                    <th align='left' scope="col" className="py-3 pl-16 w-[25%]">Full Name</th>

                                                    <th scope="col" className="py-3.5 text-center w-[25%]">Class</th>

                                                    <th scope="col" className="py-3.5 text-center w-[25%]">Section</th>

                                                    <th scope="col" className="py-3.5 text-center w-[25%]">Guardian's Name</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                {
                                                    survey && survey.participants && participants && participants.map(({ studentDetails }) => (
                                                        <tr>
                                                            <td className="py-4 text-base pl-16 whitespace-nowrap w-[25%]">{studentDetails.studentName}</td>

                                                            <td className="py-4 text-base text-center whitespace-nowrap w-[25%]">{studentDetails.class}</td>

                                                            <td className="py-4 text-base whitespace-nowrap w-[25%]" align="center">{studentDetails.section}</td>

                                                            <td align="center" className="py-4 text-base whitespace-nowrap">{studentDetails.guardianName}</td>
                                                        </tr>
                                                    ))
                                                }{
                                                    survey && survey.participants && participants.length == 0 && !isSearchNotFound &&
                                                    <tr className='w-full'>
                                                        <td colSpan={4}>
                                                            <p className="py-6 text-center text-red-700">No any Participants to show!</p>
                                                        </td>
                                                    </tr>
                                                }{
                                                    isSearchNotFound &&
                                                    <tr className='w-full'>
                                                        <td colSpan={4}>
                                                            <p className="py-6 text-center ">Search results not found!</p>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default SingleSurvey
