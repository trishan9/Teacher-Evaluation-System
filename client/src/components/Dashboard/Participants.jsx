import { utils, writeFile } from "xlsx";
import { Download } from 'lucide-react'

const Participants = ({ survey, participants }) => {
    const handleDownload = (name, data) => {
        const payload = data.map((studentDetail) => studentDetail);
        const worksheet = utils.json_to_sheet(payload);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Data");
        writeFile(workbook, `${name}.xlsx`);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-start justify-between w-full gap-4 px-4 py-6 bg-white border-2 rounded-t-lg lg:items-center lg:flex-row lg:justify-between lg:px-8 border-light-border ">
                <p className="text-lg font-semibold">Participants</p>

                {survey &&
                    survey.participantDetails &&
                    survey.participantDetails.length && (
                        <div className="flex flex-col items-stretch w-full gap-4 lg:w-fit lg:flex-row">
                            <button
                                onClick={() =>
                                    handleDownload(survey.name, survey.participantDetails)
                                }
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm transition-all ease-in-out bg-white border border-gray-300 rounded-md lg:justify-normal hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed "
                            >
                                Download
                                <Download className="w-4 h-4 ml-1.5" />
                            </button>
                        </div>
                    )}
            </div>

            <div className="mb-12 overflow-x-auto bg-white border rounded-b-lg lg:overflow-hidden">
                <div className="flow-root mt-4">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full text-xs divide-y divide-gray-300 lg:text-base">
                                <thead>
                                    <tr className="font-semibold text-gray-500">
                                        <th
                                            align="left"
                                            scope="col"
                                            className="py-3 pl-7 lg:pl-16 w-[25%]"
                                        >
                                            Full Name
                                        </th>

                                        <th
                                            scope="col"
                                            className="py-3.5 text-center w-[25%]"
                                        >
                                            Class
                                        </th>

                                        <th
                                            scope="col"
                                            className="py-3.5 pr-8 lg:pr-0 text-center w-[30%]"
                                        >
                                            Guardian's Name
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {survey &&
                                        survey.participantDetails &&
                                        participants &&
                                        participants.map((studentDetail) => (
                                            <tr key={studentDetail.id}>
                                                <td className="py-4 text-sm lg:text-base pl-7 lg:pl-16 whitespace-nowrap w-[25%]">
                                                    {studentDetail.studentName}
                                                </td>

                                                <td className="py-4 text-sm lg:text-base text-center whitespace-nowrap w-[25%]">
                                                    {studentDetail.class} '{studentDetail.section}
                                                    '
                                                </td>

                                                <td
                                                    align="center"
                                                    className="py-4 pr-8 text-sm lg:pr-0 lg:text-base whitespace-nowrap"
                                                >
                                                    {studentDetail.guardianName}
                                                </td>
                                            </tr>
                                        ))}

                                    {survey &&
                                        survey.participantDetails &&
                                        participants.length == 0 && (
                                            <tr className="w-full">
                                                <td colSpan={4}>
                                                    <p className="py-6 text-center text-red-700">
                                                        No any Participants to show!
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Participants
