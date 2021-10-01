const Footer = ({ footerNavigation }) => {
	return (
		<footer aria-labelledby="footer-heading" className="bg-gray-900">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="grid grid-cols-2 gap-8 xl:col-span-2">
						<div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-medium text-white">
									Shop
								</h3>
								<ul className="mt-6 space-y-6">
									{footerNavigation.shop.map(item => (
										<li key={item.name} className="text-sm">
											<a
												href={item.href}
												className="text-gray-300 hover:text-white">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-sm font-medium text-white">
									Company
								</h3>
								<ul className="mt-6 space-y-6">
									{footerNavigation.company.map(item => (
										<li key={item.name} className="text-sm">
											<a
												href={item.href}
												className="text-gray-300 hover:text-white">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-medium text-white">
									Account
								</h3>
								<ul className="mt-6 space-y-6">
									{footerNavigation.account.map(item => (
										<li key={item.name} className="text-sm">
											<a
												href={item.href}
												className="text-gray-300 hover:text-white">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-sm font-medium text-white">
									Connect
								</h3>
								<ul className="mt-6 space-y-6">
									{footerNavigation.connect.map(item => (
										<li key={item.name} className="text-sm">
											<a
												href={item.href}
												className="text-gray-300 hover:text-white">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-800 py-10">
					<p className="text-sm text-gray-400">
						Copyright &copy; 2021 Clothing Company Inc.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer