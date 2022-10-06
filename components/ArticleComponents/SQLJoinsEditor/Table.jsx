
export default function Table({data}) {
  const {output, heading, totalRows} = data
  
  if (!output) {
    return null
  }

  return (
    <div className="overflow-auto max-h-80">
    {heading && <h3 className="sm:text-3xl text-lg  sm:mt-5 mt-3 sm:mb-3 mb-2 font-semibold">{heading}</h3>}
    {totalRows && <p className="sm:text-lg text-base sm:my-4 my-2 font-bold">Total rows: {totalRows}</p>}
    <table className="table-auto w-full">
      <thead>
        <tr>
          {output[0]?.columns.map((col, i) => <th key={i} className="border px-4 py-2">{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {output[0]?.values.map((row, i) => (
          <tr key={i}>
            {row.map((col, i) => <td key={i} className="border px-4 py-2">{col}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}