import { useState } from "react";

function EventForm() {
    const [eventData, setEventData] = useState({
        startTime: "",
        location: "home",
        mealsCount: 1,
        hasGuests: false,
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setEventData({
            ...eventData,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    return (
        <form className="event-form">
            <label>
                שעת כניסת השבת:        <input
                    type="time"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                />
            </label>

            <label>
                מיקום:
                <select
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                >
                    <option value="home">בבית</option>
                    <option value="travel">נוסעים</option>
                </select>
            </label>

            {eventData.location === "home" && (
                <label >
                    כמות סעודות בבית:
                    <input
                        type="number"
                        min={1}
                        max={3}
                        name="mealsCount"
                        value={eventData.mealsCount}
                        onChange={handleChange}
                    />
                </label>
            )}
            {eventData.location === "home" && (

            <label>
                <input
                    type="checkbox"
                    name="hasGuests"
                    checked={eventData.hasGuests}
                    onChange={handleChange}
                />
                יש אורחים
            </label>)}
        </form>
    );
}

export default EventForm;
