const AnonymousMessages = ({ survey }) => {
    return (
        <div className="flex flex-col w-full gap-3 p-4 bg-white border-2 rounded-lg">
            <p className="text-lg font-semibold">Anonymous Messages & Abuse Reports</p>

            <div className="flex flex-col items-start w-full gap-4">
                <ul className="flex flex-col text-base font-medium list-disc list-inside">
                    <p className="mb-2 font-semibold">Anonymous Messages</p>
                    {survey?.optional ?
                        survey?.optional.map((data) => {
                            if (data.anonymous != "") {
                                return (
                                    <li className="text-base">{data.anonymous}</li>
                                )
                            }
                        })
                        : <li>No Anonymous Messages!</li>}
                </ul>

                <ul className="flex flex-col text-base font-medium list-disc list-inside">
                    <p className="mb-2 font-semibold">Abuse Report</p>
                    {survey?.optional ?
                        survey?.optional.map((data) => {
                            if (data.abuseReport != "") {
                                return (
                                    <li className="text-base">{data.abuseReport}</li>
                                )
                            }
                        })
                        : <li>No Abuse Reports!</li>}
                </ul>
            </div>
        </div>
    )
}

export default AnonymousMessages

