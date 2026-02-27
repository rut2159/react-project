
import React, { useState, useEffect, useRef } from "react";

const uid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
  `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const storageKey = (sectionName) => `cooking_section_${sectionName}`;

const ShowSection = ({ sectionName, items = [] }) => {
    
    const init = () => {
        try {
            const saved = localStorage.getItem(storageKey(sectionName));
            if (saved) return JSON.parse(saved);
        } catch (e) { /* ignore parse errors */ }

        return (items || []).map(text => ({ id: uid(), text, done: false }));
    };

    const [list, setList] = useState(init);
    const [pendingDelete, setPendingDelete] = useState(null); 
    const inputRef = useRef(null);
    const confirmTimeoutRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem(storageKey(sectionName), JSON.stringify(list));
        } catch (e) { }
    }, [list, sectionName]);

    useEffect(() => {
        setList((prev) => {
            const saved = (() => {
                try {
                    return localStorage.getItem(storageKey(sectionName));
                } catch { return null; }
            })();
            if (saved) return JSON.parse(saved);
            return (items || []).map(text => ({ id: uid(), text, done: false }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionName]);

    useEffect(() => {
        return () => {
            if (confirmTimeoutRef.current) {
                clearTimeout(confirmTimeoutRef.current);
                confirmTimeoutRef.current = null;
            }
        };
    }, []);

    const addItem = (e) => {
        e && e.preventDefault();
        const text = (inputRef.current?.value || "").trim();
        if (!text) return;
        setList(prev => [{ id: uid(), text, done: false }, ...prev]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeItem = (id) => {
        setList(prev => prev.filter(i => i.id !== id));
    };

    const requestDelete = (id) => {
        // התחלת תהליך אישור מחיקה אינליין
        setPendingDelete(id);
        // בטל אישור אוטומטי אחרי 6 שניות
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = setTimeout(() => {
            setPendingDelete(null);
            confirmTimeoutRef.current = null;
        }, 6000);
    };

    const confirmDelete = (id) => {
        if (confirmTimeoutRef.current) {
            clearTimeout(confirmTimeoutRef.current);
            confirmTimeoutRef.current = null;
        }
        removeItem(id);
        setPendingDelete(null);
    };

    const cancelDelete = () => {
        if (confirmTimeoutRef.current) {
            clearTimeout(confirmTimeoutRef.current);
            confirmTimeoutRef.current = null;
        }
        setPendingDelete(null);
    };

    const toggleDone = (id) => {
        setList(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
    };

    return (
        <section className="cooking-section home-task">
            <h3 className="home-task-title">{sectionName}</h3>

            <form className="home-task-add" onSubmit={addItem}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="הוסף מנה..."
                    aria-label={`הוסף מנה ל־${sectionName}`}
                    className="home-task-input"
                />
                <button type="submit" className="home-task-add-btn">הוספה</button>
            </form>

            <ul className="home-task-list">
                {list.map(item => (
                    <li key={item.id} className={`home-task-item ${item.done ? "done" : ""}`}>
                        <label className="home-task-item-label">
                            <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => toggleDone(item.id)}
                                className="home-task-checkbox"
                            />
                            <span className="home-task-text">{item.text}</span>
                        </label>

                        <div className="home-task-actions">
                            {pendingDelete === item.id ? (
                                <div className="home-task-delete-confirm" role="alertdialog" aria-live="polite">
                                    <span className="home-task-delete-msg">למחוק?</span>
                                    <button
                                        type="button"
                                        className="home-task-delete-yes"
                                        onClick={() => confirmDelete(item.id)}
                                    >
                                        כן
                                    </button>
                                    <button
                                        type="button"
                                        className="home-task-delete-no"
                                        onClick={cancelDelete}
                                    >
                                        ביטול
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    title="מחק פריט"
                                    aria-label={`הסר ${item.text}`}
                                    className="home-task-remove-btn"
                                    onClick={() => requestDelete(item.id)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </li>
                ))}
                {list.length === 0 && <li className="home-task-empty">אין מנות</li>}
            </ul>
        </section>
    );
};

export default ShowSection;
// ...existing code...