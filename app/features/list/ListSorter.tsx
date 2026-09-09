import { FC } from 'react'
import { SortOption } from '../../types/types'

interface Props{
  onChangeSorting: (option: SortOption) => void
}

const ListSorter:FC<Props> = ({ onChangeSorting }) => {
  return (
    <div className="mb-4 flex items-center gap-3">
    <p className="text-sm font-medium text-gray-700">Sort:</p>
    <select
      className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
      onChange={(e) => onChangeSorting(e.target.value as SortOption)}
    >
      <option value={SortOption.alphabetically}>Alphabetically</option>
      <option value={SortOption.newest}>Newest</option>
      <option value={SortOption.oldest}>Oldest</option>
    </select>
  </div>
  )
}

export default ListSorter