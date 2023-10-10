import { SideNav } from "@/components"

const CreateSurvey = () => {
    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={1} />

            <div>
                <p className="text-xl">Create Survey</p>
            </div>
        </div>
    )
}

export default CreateSurvey