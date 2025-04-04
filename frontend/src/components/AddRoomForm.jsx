import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const AddRoomForm = ({ addRoom }) => {
    // Initial state for the form
    const initialFormState = {
        roomName: '',
        roomDescription: '',
        roomFacilities: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
    };


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.roomName.trim()) {
            alert('Room name cannot be empty!');
            return;
        }

        // Create a new room object
        const newRoom = {
            ...formData,
            roomId: uuidv4(),
            roomCreationDate: new Date().toISOString()
        };

        console.log('Creating room:', newRoom);
        
        // Handle image upload
        if (formData.room) {
            console.log('Uploading image:', formData.roomImage)
        }

        addRoom(newRoom);

        // Reset the form
        setFormData(initialFormState);
    };

    return (
        <div>
            <div className="dates-section">
                <h3 className="form-titles" style={{paddingLeft: "8px"}}>Dates</h3>
                <table className="dates-table">
                    <tbody>
                        <tr>
                            <td>Created</td>
                            <td>Updated</td>
                        </tr>
                        <tr>
                        <td className="dates">{new Date().toLocaleDateString("en-GB")}</td>
                            <td className="dates">{formData.dateUpdated ? new Date(formData.dateUpdated).toLocaleDateString("en-GB") : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} style={{ fontFamily: 'Karla' }}>
                <h1 className="page-header">Room details</h1>
                <a href="/rooms" className="back-link">← back to rooms</a>
                <h2 className="sub-heading">Room details</h2>
                <h3 className="form-titles"> Title </h3>
                <input
                    type="text"
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    placeholder="Room title"
                    className="input-box"
                />
                <h3 className="form-titles"> Description </h3>
                <input
                    type="text"
                    name="roomDescription"
                    value={formData.roomDescription}
                    onChange={handleChange}
                    placeholder="Room description..."
                    className="input-box"
                />
                <h3 className="form-titles"> Facilities </h3>
                <input
                    type="text"
                    name="roomFacilities"
                    value={formData.roomFacilities}
                    onChange={handleChange}
                    placeholder="Room facilities..."
                    className="input-box"
                />
                <button type="submit" className="create-button1">CREATE AND GENERATE PDF</button>
            </form>
        </div>
    );
};

export default AddRoomForm;