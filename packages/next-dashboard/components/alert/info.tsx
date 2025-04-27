export default function AlertInfo({title, content}: {title: string; content: string}) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:text-left">
      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {content}
        </p>
      </div>
    </div>
  )
}