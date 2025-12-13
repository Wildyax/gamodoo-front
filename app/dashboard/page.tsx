import TaskContainer from "@/components/TaskContainer/TaskContainer";

export default function DashBoard() {
    return (
        <>
        <div className="grid grid-cols-3 gap-4">
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
            <TaskContainer level={2} taskLabel="Revision de cours" tagList={["#cours", "#gamodoo", "#lcv"]}/>
            <TaskContainer level={5} taskLabel="Gaming" tagList={["#game"]}/>
        </div>
            
        </>
    );
}