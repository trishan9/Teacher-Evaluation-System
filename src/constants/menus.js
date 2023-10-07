import {
    ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
    ClockIcon as ClockIconSolid, Cog6ToothIcon as Cog6ToothIconSolid,
    PlusCircleIcon as PlusCircleIconSolid
} from '@heroicons/react/24/solid'
import { ClipboardDocumentListIcon, ClockIcon, Cog6ToothIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

const menus = [
    {
        name: "Surveys",
        icon: ClipboardDocumentListIcon,
        solidIcon: ClipboardDocumentListIconSolid,
        url: "/"
    },
    {
        name: "Create Survey",
        icon: PlusCircleIcon,
        solidIcon: PlusCircleIconSolid,
        url: "/create-survey"
    },
    {
        name: "History",
        icon: ClockIcon,
        solidIcon: ClockIconSolid,
        url: "/history"
    },
    {
        name: "Settings",
        icon: Cog6ToothIcon,
        solidIcon: Cog6ToothIconSolid,
        url: "/settings"
    }
]

export default menus