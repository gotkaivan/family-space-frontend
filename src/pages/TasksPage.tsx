import PageLoader from 'common/components/ui/Loader/PageLoader';
import TaskStatuses from 'domains/task/components/TaskStatuses';
import useTask from 'domains/task/hooks/useTask';

const TasksPage = () => {
	const {
		data,
		isLoading,
		createNewTask,
		createNewStatus,
		updateStatus,
		updateTask,
		changeTaskPosition,
		changeStatusPosition,
		updateSubtask,
		deleteStatus,
		deleteTask,
		deleteSubtask,
	} = useTask();

	return isLoading ? (
		<PageLoader className="h-70" />
	) : (
		<TaskStatuses
			data={data}
			createNewTask={createNewTask}
			createNewStatus={createNewStatus}
			updateStatus={updateStatus}
			updateTask={updateTask}
			updateSubtask={updateSubtask}
			changeTaskPosition={changeTaskPosition}
			changeStatusPosition={changeStatusPosition}
			deleteStatus={deleteStatus}
			deleteTask={deleteTask}
			deleteSubtask={deleteSubtask}
		/>
	);
};

export default TasksPage;
