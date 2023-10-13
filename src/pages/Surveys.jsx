import { Surveys, SideNav } from "@/components"

const SurveysPage = () => {
    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={0} />

            <Surveys />
        </div>
    )
}

export default SurveysPage
