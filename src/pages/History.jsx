import { SideNav } from "@/components"

const History = () => {
    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={2} />

            <div>
                <p className="text-xl">History</p>
            </div>
        </div>
    )
}

export default History
