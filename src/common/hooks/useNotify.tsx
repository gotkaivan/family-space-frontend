import Icon from 'common/components/ui/Icon';
import toast, { Toast } from 'react-hot-toast';

export enum NOTIFY_TYPES {
	ERROR = 'ERROR',
	SUCCESS = 'SUCCESS',
	WARNING = 'WARNING',
}

export const useNotify = () => {
	const getSuccessNotify = (t: Toast, message: string) => {
		return (
			<div
				id="toast-success"
				className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
				role="alert"
			>
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
					<Icon
						name={'check-circle'}
						size={16}
						className="w-5 h-5"
					/>
				</div>
				<div className="ml-3 text-sm font-normal">{message}</div>
				<button
					onClick={() => toast.remove(t.id)}
					type="button"
					className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-success"
					aria-label="Close"
				>
					<Icon
						name={'x'}
						size={16}
					/>
				</button>
			</div>
		);
	};

	const getErrorNotify = (t: Toast, message: string) => {
		return (
			<div
				id="toast-danger"
				className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
				role="alert"
			>
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
					<Icon
						name={'shield-alert'}
						size={16}
						className="w-5 h-5"
					/>
				</div>
				<div className="ml-3 text-sm font-normal">{message}</div>
				<button
					onClick={() => toast.remove(t.id)}
					type="button"
					className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-danger"
					aria-label="Close"
				>
					<Icon
						name={'x'}
						size={16}
					/>
				</button>
			</div>
		);
	};

	const getWarningNotify = (t: Toast, message: string) => {
		return (
			<div
				id="toast-warning"
				className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
				role="alert"
			>
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
					<Icon
						name={'alert-triangle'}
						size={16}
						className="w-5 h-5"
					/>
				</div>
				<div className="ml-3 text-sm font-normal">{message}</div>
				<button
					onClick={() => toast.remove(t.id)}
					type="button"
					className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-warning"
					aria-label="Close"
				>
					<Icon
						name={'x'}
						size={16}
					/>
				</button>
			</div>
		);
	};

	const notify = (type: NOTIFY_TYPES, message: string = '') => {
		toast.custom(
			t => {
				switch (type) {
					case NOTIFY_TYPES.SUCCESS:
						return getSuccessNotify(t, message);
					case NOTIFY_TYPES.ERROR:
						return getErrorNotify(t, message);
					case NOTIFY_TYPES.WARNING:
						return getWarningNotify(t, message);
				}
			},
			{
				duration: 5000,
			}
		);
	};

	return {
		notify,
	};
};
