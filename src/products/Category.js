import { useParams } from 'react-router'
import Breadcrumb from './Breadcrumb'

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]

const Category = () => {
	const { id } = useParams()
	return (
		<>
			<Breadcrumb breadcrumbs={breadcrumbs} />
			<span>Category id: {id}</span>
		</>
	)
}

export default Category
