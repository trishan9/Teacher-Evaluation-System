import { Surveys, SideNav } from "@/components"

const Home = () => {
    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={0} />

            <Surveys />
        </div>
    )
}

export default Home
