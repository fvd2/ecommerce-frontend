import { Dialog } from '@headlessui/react'

const DialogUi = ({ title, description, isOpen, setIsOpen }) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

				<div className="mb-2 relative bg-white p-4 rounded-2xl max-w-sm mx-auto">
					<div className>
						<div className="text-lg font-bold mb-3">
							<Dialog.Title>{title}</Dialog.Title>
						</div>
						<div className="text-md mb-3">
						<Dialog.Description>
							<p>{description}</p>
						</Dialog.Description>
						</div>
					</div>
					<button
						className="w-auto mx-auto flex-1 bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
						onClick={() => setIsOpen(false)}>
						Got it!
					</button>
				</div>
			</div>
		</Dialog>
	)
}

export default DialogUi
