
import { TasksProvider } from "@/contexts/TasksContext";
import TasksLayout from "@/components/tasks/TasksLayout";

const Tasks = () => {
  return (
    <TasksProvider>
      <TasksLayout />
    </TasksProvider>
  );
};

export default Tasks;
