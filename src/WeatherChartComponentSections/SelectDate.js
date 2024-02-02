import React from 'react'

const SelectDate = ({data, uniqueDates, fetchData, setSelectedDate}) => {

  const HandleDateChange = (changedDate) => {
    setSelectedDate(changedDate)
    fetchData(changedDate)
  }
  return (
    <>
    {data.length !== 0 ? <div className="selectDate">
                {data.length !== 0 ? (
                  <select onChange={(e) => HandleDateChange(e.target.value)}>
                    {uniqueDates.map((uniqueDate) => (
                      <option key={uniqueDate} value={uniqueDate}>
                        {new Date(uniqueDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div> : null}
    </>
  )
}

export default SelectDate;
