import { useGlobalContext } from "../context/GlobalContext.jsx";

function EventForm() {
    const { settings, updateSetting } = useGlobalContext();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        updateSetting({ [name]: type === "checkbox" ? checked : value });
    }

    return (
        <form className="event-form">
            <label>
                שעת כניסת השבת:
                <input
                    type="time"
                    name="startTime"
                    value={settings.startTime || ""}
                    onChange={handleChange}
                />
            </label>

            <label>
                מיקום:
                <select
                    name="location"
                    value={settings.location}
                    onChange={handleChange}
                >
                    <option value="home">בבית</option>
                    <option value="travel">נוסעים</option>
                </select>
            </label>

            {settings.location === "home" && (
                <label >
                    כמות סעודות בבית:
                    <input
                        type="number"
                        min={1}
                        max={3}
                        name="mealsCount"
                        value={settings.mealsCount || 1}
                        onChange={handleChange}
                    />
                </label>
            )}
            {settings.location === "home" && (
            <label>
                <input
                    type="checkbox"
                    name="hasGuests"
                    checked={!!settings.hasGuests}
                    onChange={handleChange}
                />
                יש אורחים
            </label>)}
        </form>
    );
}

export default EventForm;
