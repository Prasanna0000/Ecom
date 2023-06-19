import { useMutation, useQueryClient } from 'react-query';
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./Profile.css";
import { Getprofiledatabyid, postTheProfileData, updateProfileDataById } from '../../API/Service';

export const Profile = () => {
    const queryClient = useQueryClient();
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (param.id) {
            const Fetchdata = async () => {
                try {
                    const itemData = await Getprofiledatabyid(param.id);
                    // Populate the form fields with the fetched item data 
                    const { doornumber, street, landmark, pincode, district, location, description } = itemData;
                    document.getElementById('doornumber').value = doornumber;
                    document.getElementById('street').value = street;
                    document.getElementById('landmark').value = landmark;
                    document.getElementById('pincode').value = pincode;
                    document.getElementById('district').value = district;
                    document.getElementById('location').value = location;
                    document.getElementById('description').value = description;
                } catch (error) {
return error                }
            };

            Fetchdata();
        }
    }, [param.id]);

    const queryKey = param.id ? ['updateProfileDataById', param.id] : 'postTheProfileData';
    const mutation = useMutation(param.id ? updateProfileDataById : postTheProfileData, {
        onError: (error) => {
            return error
        },
        onSuccess: () => {
            // Invalidate the query to trigger a refetch and update the Grid component
            queryClient.invalidateQueries('items');
            navigate('/grid');
        },
    });

    const Handleprofilesubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const itemData = {
            doornumber: formData.get('doornumber'),
            street: formData.get('street'),
            landmark: formData.get('landmark'),
            pincode: formData.get('pincode'),
            district: formData.get('district'),
            location: formData.get('location'),
            description: formData.get('description'),
        };

        if (param.id) {
            // Update existing profile data
            const req = mutation.mutate(param.id, itemData);
        } else {
            // Create new profile data
            mutation.mutate(itemData);
        }

        e.target.reset();
    }

    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={Handleprofilesubmit}>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="firstname" className="formbold-form-label">
                                DoorNo
                            </label>
                            <input
                                type="text"
                                id="doornumber"
                                name="doornumber"
                                className="formbold-form-input"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="formbold-form-label">
                                Street Name
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Cooper"
                                className="formbold-form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="email" className="formbold-form-label">
                                LandMark Near by
                            </label>
                            <input
                                type="text"
                                id="landmark"
                                name="landmark"
                                className="formbold-form-input"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="formbold-form-label">
                                District
                            </label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder="Enter the District name"
                                className="formbold-form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="formbold-input-radio-wrapper">
                        <div>
                            <label htmlFor="jobtitle" className="formbold-form-label">
                                Location
                            </label>

                            <div className="formbold-radio-flex">
                                <div className="formbold-radio-group">
                                    <label className="formbold-radio-label">
                                        <input
                                            className="formbold-input-radio"
                                            type="radio"
                                            id="home"
                                            name="location"
                                            value="home" // Set the value to "Home"
                                            required
                                        />
                                        Home
                                        <span className="formbold-radio-checkmark"></span>
                                    </label>
                                </div>

                                <div className="formbold-radio-group">
                                    <label className="formbold-radio-label">
                                        <input
                                            className="formbold-input-radio"
                                            type="radio"
                                            id="office"
                                            name="location"
                                            value="Office" // Set the value to "Office"
                                            required
                                        />
                                        Office
                                        <span className="formbold-radio-checkmark"></span>
                                    </label>
                                </div>

                                <div className="formbold-radio-group">
                                    <label className="formbold-radio-label">
                                        <input
                                            className="formbold-input-radio"
                                            type="radio"
                                            id="other"
                                            name="location"
                                            value="other" // Set the value to "Office"
                                            required
                                        />
                                        Others
                                        <span className="formbold-radio-checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pincode" className="formbold-form-label">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                placeholder="Enter the pincode"
                                className="formbold-form-input"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="formbold-form-label">
                            Message
                        </label>
                        <textarea
                            rows="6"
                            id="description"
                            name="description"
                            placeholder="Type your additional message"
                            className="formbold-form-input"
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Submit</button>
                    <Link to="/grid">Go to Grid</Link>
                </form>
            </div>
        </div>
    );
};

// Export the Profile component
export default Profile;
