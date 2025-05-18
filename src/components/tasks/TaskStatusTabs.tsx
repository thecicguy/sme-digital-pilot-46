
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskStatusTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TaskStatusTabs = ({ activeTab, onTabChange }: TaskStatusTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="doing">In Progress</TabsTrigger>
        <TabsTrigger value="for_review">For Review</TabsTrigger>
        <TabsTrigger value="done">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TaskStatusTabs;
