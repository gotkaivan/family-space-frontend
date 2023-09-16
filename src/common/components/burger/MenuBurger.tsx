const MenuBurger = (props: { isOpen: boolean; clickHandler: (e: any) => void }) => {
	return (
		<button
			aria-controls="sidebar"
			onClick={e => props.clickHandler(e)}
			className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
		>
			<span className="relative block h-3.5 w-3.5 cursor-pointer">
				<span className="du-block absolute right-0 h-full w-full">
					<span
						className={`relative top-0 left-0 my-0.5 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
							props.isOpen && '!w-full delay-300'
						}`}
					></span>
					<span
						className={`relative top-0 left-0 my-0.5 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
							props.isOpen && 'delay-400 !w-full'
						}`}
					></span>
					<span
						className={`relative top-0 left-0 my-0.5 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
							props.isOpen && '!w-full delay-500'
						}`}
					></span>
				</span>
				<span className="absolute right-0 h-full w-full rotate-45">
					<span
						className={`absolute left-1.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
							props.isOpen && '!h-0 !delay-[0]'
						}`}
					></span>
					<span
						className={`delay-400 absolute left-0 top-1.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
							props.isOpen && '!h-0 !delay-200'
						}`}
					></span>
				</span>
			</span>
		</button>
	);
};

export default MenuBurger;
