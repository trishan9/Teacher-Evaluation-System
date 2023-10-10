import { SideNav } from "@/components";

const Settings = () => {
    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={3} />

            <div>
                <p className="text-xl">Settings</p>
            </div>
        </div>
    )
}

export default Settings
