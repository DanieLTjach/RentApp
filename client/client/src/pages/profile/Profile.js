import React from 'react';
import Header from '../../entities/header/Header';
import Footer from '../../entities/footer/Footer';
import './profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (123) 456-7890',
            avatar: null,
            avatarPreview: '/default-avatar.png',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ avatar: file, avatarPreview: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    render() {
        const { name, email, phone, avatarPreview } = this.state;

        return (
            <div className="profile-page">
                <Header />

                <div className="profile-form-wrapper">
                    <div className="profile-form">
                        <div className="avatar-section">
                            <img src={avatarPreview} alt="" className="profile-avatar" />
                            <label className="upload-label">
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleAvatarChange}
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button className="save-button">
                            Save Changes
                        </button>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Profile;
