import { FC } from 'react'

interface Props{
    showOnlyFavorite: boolean
    onChangeShowOnlyFavorite: (showOnlyFavorite: boolean) => void
}

const ShowOnlyFavoriteCheckbox:FC<Props> = ({ showOnlyFavorite, onChangeShowOnlyFavorite }) => {
  return (
    <div className="mb-4 flex w-fit items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
    <p className="text-sm font-medium text-gray-700">
      Show only favorites
    </p>
    <input
      className="h-4 w-4 cursor-pointer accent-gray-900"
      type="checkbox"
      checked={showOnlyFavorite}
      onChange={() => onChangeShowOnlyFavorite(!showOnlyFavorite)}
    ></input>
  </div>
  )
}

export default ShowOnlyFavoriteCheckbox