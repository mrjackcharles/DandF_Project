import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api.js";
import '../App.css';

const UpdateRoomForm = () => {
    const { roomId } = useParams(); // Get the roomName from the URL
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        roomName: "",
        roomDescription: "",
        roomFacilities: "",
        dateCreated: "",
        dateUpdated: "",
    });

    // Fetch room details when the component loads
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await api.get(`/rooms/${roomId}`);
                if (response.data) {
                    setRoom(response.data);
                } else {
                    console.error("Room not found");
                }
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    // Handle update request
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/rooms/${roomId}`, room); // Send updated room details
            alert("Room updated successfully!");
            navigate("/rooms"); // Redirect back to the rooms list
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    // Handle delete request
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await api.delete(`/rooms/${roomId}`); // Call the DELETE endpoint
                alert("Room deleted successfully!");
                navigate("/rooms"); // Redirect back to the rooms list
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
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
                            <td className="dates">{room.dateCreated ? new Date(room.dateCreated).toLocaleDateString("en-GB") : "-"}</td>
                            <td className="dates">{room.dateUpdated ? new Date(room.dateUpdated).toLocaleDateString("en-GB") : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} style={{ fontFamily: 'Karla' }}>
                <h1 className="page-header">Room details</h1>
                <a href="/rooms" className="back-link">← back to rooms</a>
                <a type="button" onClick={handleDelete} className="back-link" style={{ marginLeft: "450px"}}>X Delete Room</a>
                <h2 className="sub-heading">Room details</h2>
                <h3 className="form-titles"> Title </h3>
                <input
                    type="text"
                    name="roomName"
                    value={room.roomName}
                    onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
                    placeholder="Room title"
                    className="input-box"
                />
                <h3 className="form-titles"> Description </h3>
                <input
                    type="text"
                    name="roomDescription"
                    value={room.roomDescription}
                    onChange={(e) => setRoom({ ...room, roomDescription: e.target.value })}
                    placeholder="Room description..."
                    className="input-box"
                />
                <h3 className="form-titles"> Facilities </h3>
                <input
                    type="text"
                    name="roomFacilities"
                    value={room.roomFacilities}
                    onChange={(e) => setRoom({ ...room, roomFacilities: e.target.value })}
                    placeholder="Room facilities..."
                    className="input-box"
                />
                <button type="submit" className="create-button1">SAVE AND GENERATE PDF</button>
            </form>
        </div>
    );
};

export default UpdateRoomForm;