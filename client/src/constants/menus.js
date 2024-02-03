import { FilePlus2 } from 'lucide-react'
import { History, ClipboardList, PlusCircle, Settings } from 'lucide-react'

const menus = [
    {
        name: "Surveys",
        icon: ClipboardList,
        solidIcon: ClipboardList,
        url: "/dashboard/surveys"
    },
    {
        name: "Create Survey",
        icon: FilePlus2,
        solidIcon: FilePlus2,
        url: "/dashboard/create-survey"
    },
    {
        name: "History",
        icon: History,
        solidIcon: History,
        url: "/dashboard/history"
    },
    {
        name: "Settings",
        icon: Settings,
        solidIcon: Settings,
        url: "/dashboard/settings"
    }
]

export default menus