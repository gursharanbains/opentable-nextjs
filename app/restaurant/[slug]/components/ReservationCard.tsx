"use client";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  openTime: String;
  closeTime: String;
}

export default function ReservationCard(props: IProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }

    return setSelectedDate(null);
  };

  const filterOpenTimes = (openTime: String, closeTime: String) => {
    const timesInWindow: {
      displayTime: string;
      time: string;
      searchTimes: string[];
    }[] = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (!isWithinWindow && time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesInWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesInWindow;
  };

  return (
    <div className="fixed w-[20%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleChangeDate(date)}
            className="py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterOpenTimes(props.openTime, props.closeTime).map((time) => (
              <option value={time.time} key={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
}
